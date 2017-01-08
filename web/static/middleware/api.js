import _ from 'lodash';
import { normalize } from 'normalizr';
import reqwest from 'reqwest';
import { AUTH, APP_CONFIG } from '../constants';
import { push } from 'react-router-redux';

const Symbol = require('es6-symbol');

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema, method = 'GET', params = {}) {
  const data = (_.isEmpty(params) ? {} : JSON.stringify(params));
  let fullUrl = APP_CONFIG.API_ENDPOINT + endpoint;
  return reqwest({
    data,
    method,
    url: fullUrl,
    crossOrigin: true,
    contentType: 'application/json',
  })
  .then((response) => {
    if (!response.data) {
      return Promise.reject(response);
    }

    const nextPageUrl = response.pagination ? response.pagination.next_url : null;
    const value = Object.assign(
      {},
      schema ? normalize(response.data, schema) : response,
      { nextPageUrl }
    );

    return value;
  });
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  if (typeof action.type !== 'undefined') {
    return next(action);
  }

  const callAPI = action[CALL_API];
  const { types, schema, method, data } = callAPI;
  let { endpoint } = callAPI;

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  // if (!schema) {
  // throw new Error('Specify one of the exported Schemas.');
  // }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(params) {
    const finalAction = Object.assign({}, action, params);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;

  next(actionWith({ type: requestType }));

  return callApi(endpoint, schema, method, data).then(
    payload => next(actionWith({
      payload,
      type: successType,
    })),
    error => {
      if (_.isEmpty(error.response)) {
        return null;
      }

      const response = JSON.parse(error.response);
      switch (response.error.type) {
        case 'AuthenticationFailError':
          next(actionWith({
            type: AUTH.LOGOUT,
          }));
          store.dispatch(push('/signin'));
          break;

        default:
          next(actionWith({
            type: failureType,
            payload: response.error,
          }));
      }
    }
  );
};
