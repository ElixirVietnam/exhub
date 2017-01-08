import { USERS } from '../constants';
import { USER_ARRAY, USER } from '../schemas';
import { CALL_API } from '../middleware/api';


export function fetchUsers(fields = [], nextPageUrl = null) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();
    const selectedFields = fields.join(',');
    const requestUrl = `/admin-api/users?selected_fields=${selectedFields}&access_token=${token}`;
    const shouldAppend = !!nextPageUrl;
    const endpoint = nextPageUrl ? nextPageUrl : requestUrl;

    return dispatch({
      shouldAppend,
      [CALL_API]: {
        types: [
          USERS.FETCH_LIST_USERS_SUBMITTED,
          USERS.FETCH_LIST_USERS_SUCCEED,
          USERS.FETCH_LIST_USERS_FAILED,
        ],
        endpoint: endpoint,
        schema: USER_ARRAY,
      },
    });
  };
}

export function searchUser(username, fields = []) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();
    const selectedFields = fields.join(',');
    const endpoint = `/admin-api/users?username=${username}&selected_fields=${selectedFields}&access_token=${token}`;

    return dispatch({
      false,
      [CALL_API]: {
        types: [
          USERS.SEARCH_USER_SUBMITTED,
          USERS.SEARCH_USER_SUCCEED,
          USERS.SEARCH_USER_FAILED,
        ],
        endpoint: endpoint,
        schema: USER_ARRAY,
      },
    });
  };
}

function fetchUser(path, fields = []) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();
    const selectedFields = fields.join(',');
    const endpoint = `${path}?selected_fields=${selectedFields}&access_token=${token}`;

    return dispatch({
      false,
      [CALL_API]: {
        types: [
          USERS.FETCH_USER_BY_ID_SUBMITTED,
          USERS.FETCH_USER_BY_ID_SUCCEED,
          USERS.FETCH_USER_BY_ID_FAILED,
        ],
        endpoint: endpoint,
        schema: USER,
      },
    });
  };
}

export function fetchUserById(userId, fields = []) {
  return fetchUser(`/admin-api/users/${userId}`, fields);
}

export function fetchCurrentUser(userId, fields = []) {
  return fetchUser('/v1/users/me', fields);
}

function updateUser(path, data, fields = []) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();
    const selectedFields = fields.join(',');
    const endpoint = `${path}?selected_fields=${selectedFields}&access_token=${token}`;

    return dispatch({
      false,
      [CALL_API]: {
        types: [
          USERS.UPDATE_USER_BY_ID_SUBMITTED,
          USERS.UPDATE_USER_BY_ID_SUCCEED,
          USERS.UPDATE_USER_BY_ID_FAILED,
        ],
        endpoint: endpoint,
        method: 'PUT',
        data: data,
        schema: USER,
      },
    });
  };
}

export function updateUserById(userId, data, fields = []) {
  return updateUser(`/admin-api/users/${userId}`, data, fields);
}

export function updateCurrentUser(data, fields = []) {
  return updateUser('/v1/users/me', data, fields);
}


export function deleteUserById(userId, fields = []) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();
    const selectedFields = fields.join(',');
    const endpoint = `/admin-api/users/${userId}?selected_fields=${selectedFields}&access_token=${token}`;

    return dispatch({
      false,
      [CALL_API]: {
        types: [
          USERS.UPDATE_USER_BY_ID_SUBMITTED,
          USERS.UPDATE_USER_BY_ID_SUCCEED,
          USERS.UPDATE_USER_BY_ID_FAILED,
        ],
        endpoint: endpoint,
        method: 'DELETE',
        schema: USER,
      },
    });
  };
}

export function createUser(data, fields = []) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();
    const selectedFields = fields.join(',');
    const endpoint = `/admin-api/users?selected_fields=${selectedFields}&access_token=${token}`;

    return dispatch({
      false,
      [CALL_API]: {
        types: [
          USERS.CREATE_USER_SUBMITTED,
          USERS.CREATE_USER_SUCCEED,
          USERS.CREATE_USER_FAILED,
        ],
        endpoint: endpoint,
        method: 'POST',
        data: data,
        schema: USER,
      },
    });
  };
}
