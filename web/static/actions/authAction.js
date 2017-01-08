import _ from 'lodash';
import { APP_CONFIG, AUTH } from '../constants';
import { CALL_API } from '../middleware/api';
import { generateSignature } from '../common/utils';
import { USER } from '../schemas';

function requestWithSignature(path, data, selectedFields) {
  const fields = selectedFields.join(',');

  _.merge(data, {
    api_key: APP_CONFIG.API_KEY,
    selected_fields: fields
  });

  const API_SIG = generateSignature(path, data);
  const endpoint = `${path}?api_sig=${API_SIG}&api_key=${APP_CONFIG.API_KEY}&selected_fields=${fields}`;

  return {
    [CALL_API]: {
      data,
      method: 'POST',
      endpoint: endpoint,
      types: [
        AUTH.LOGIN_SUBMITTED,
        AUTH.LOGIN_SUCCEED,
        AUTH.LOGIN_FAILED,
      ],
      schema: USER,
    },
  };
}

export function loginSubmitted(data) {
  return requestWithSignature(
    '/v1/accounts/signin', data, [
      'id', 'username', 'name', 'role_type',
      'access_token.value', 'access_token.expired_at'
    ])
}


export function signUpSubmitted(data) {
  return requestWithSignature(
    '/v1/accounts/signup', data, [
      'id', 'username', 'name', 'role_type',
      'access_token.value', 'access_token.expired_at'
    ])
}


export function fetchCurrentUser() {
  return (dispatch, getState) => {
    const {token} = getState().auth;
    const fields = ['id', 'name', 'username', 'role_type', 'access_token.value'].join(',');

    return dispatch({
      [CALL_API]: {
        types: [
          AUTH.FETCH_PROFILE,
          AUTH.FETCH_PROFILE_SUCCEED,
          AUTH.FETCH_PROFILE_FAILED,
        ],
        endpoint: `/v1/users/me?access_token=${token}&selected_fields=${fields}`,
        schema: USER,
      },
    });
  };
}


export function logout() {
  return {
    type: AUTH.LOGOUT,
  }
}


export function resetAuth() {
  return {
    type: AUTH.RESET,
  }
}
