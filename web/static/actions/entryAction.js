import _ from 'lodash';
import { ENTRIES } from '../constants';
import { ENTRY_ARRAY, ENTRY } from '../schemas';
import { CALL_API } from '../middleware/api';


function fetchEntries(path, fields = [], filters = {}, nextPageUrl = null) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();
    const query = _.reduce(filters, (result, value, key) => {
      return (!_.isNull(value) && !_.isUndefined(value)) ? (result += key + '=' + value + '&') : result;
    }, '').slice(0, -1);
    const selectedFields = fields.join(',');
    const requestUrl = `${path}?selected_fields=${selectedFields}&access_token=${token}&${query}`;
    const shouldAppend = !!nextPageUrl;
    const endpoint = nextPageUrl ? nextPageUrl : requestUrl;

    return dispatch({
      shouldAppend,
      [CALL_API]: {
        types: [
          ENTRIES.FETCH_LIST_ENTRIES_SUBMITTED,
          ENTRIES.FETCH_LIST_ENTRIES_SUCCEED,
          ENTRIES.FETCH_LIST_ENTRIES_FAILED,
        ],
        endpoint: endpoint,
        schema: ENTRY_ARRAY,
      },
    });
  };
}

export function fetchAllEntries(fields = [], filters = {}, nextPageUrl = null) {
  return fetchEntries('/admin-api/entries', fields, filters, nextPageUrl);
}


export function fetchUserEntries(userId, fields = [], filters = {}, nextPageUrl = null) {
  filters.user_key = userId;
  return fetchEntries('/admin-api/entries', fields, filters, nextPageUrl);
}

export function fetchCurrentUserEntries(fields = [], filters = {}, nextPageUrl = null) {
  return fetchEntries('/v1/entries', fields, filters, nextPageUrl);
}


function fetchEntry(path, fields = []) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();
    const selectedFields = fields.join(',');
    const requestUrl = `${path}?selected_fields=${selectedFields}&access_token=${token}`;

    return dispatch({
      [CALL_API]: {
        types: [
          ENTRIES.FETCH_ENTRY_BY_ID_SUBMITTED,
          ENTRIES.FETCH_ENTRY_BY_ID_SUCCEED,
          ENTRIES.FETCH_ENTRY_BY_ID_FAILED,
        ],
        endpoint: requestUrl,
        schema: ENTRY,
      },
    });
  };
}


export function fetchEntryById(id, fields = []) {
  return fetchEntry(`/admin-api/entries/${id}`, fields);
}


export function fetchCurrentUserEntryById(id, fields) {
  return fetchEntry(`/v1/entries/${id}`, fields);
}


function updateEntry(path, fields = [], data = {}) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();
    const selectedFields = fields.join(',');
    const requestUrl = `${path}?selected_fields=${selectedFields}&access_token=${token}`;

    return dispatch({
      [CALL_API]: {
        types: [
          ENTRIES.UPDATE_ENTRY_BY_ID_SUBMITTED,
          ENTRIES.UPDATE_ENTRY_BY_ID_SUCCEED,
          ENTRIES.UPDATE_ENTRY_BY_ID_FAILED,
        ],
        endpoint: requestUrl,
        data: data,
        method: 'PUT',
        schema: ENTRY,
      },
    });
  };
}


export function updateEntryById(id, fields = [], data = {}) {
  return updateEntry(`/admin-api/entries/${id}`, fields, data);
}


export function updateCurrentUserEntryById(id, fields, data = {}) {
  return updateEntry(`/v1/entries/${id}`, fields, data);
}


function deleteEntry(path, fields = []) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();
    const selectedFields = fields.join(',');
    const requestUrl = `${path}?selected_fields=${selectedFields}&access_token=${token}`;

    return dispatch({
      [CALL_API]: {
        types: [
          ENTRIES.UPDATE_ENTRY_BY_ID_SUBMITTED,
          ENTRIES.UPDATE_ENTRY_BY_ID_SUCCEED,
          ENTRIES.UPDATE_ENTRY_BY_ID_FAILED,
        ],
        endpoint: requestUrl,
        method: 'DELETE',
        schema: ENTRY,
      },
    });
  };
}


export function deleteEntryById(id, fields = []) {
  return deleteEntry(`/admin-api/entries/${id}`, fields);
}


export function deleteCurrentUserEntryById(id, fields) {
  return deleteEntry(`/v1/entries/${id}`, fields);
}


function createEntry(path, data, fields = []) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();
    const selectedFields = fields.join(',');
    const endpoint = `${path}?selected_fields=${selectedFields}&access_token=${token}`;

    return dispatch({
      false,
      [CALL_API]: {
        types: [
          ENTRIES.CREATE_ENTRY_SUBMITTED,
          ENTRIES.CREATE_ENTRY_SUCCEED,
          ENTRIES.CREATE_ENTRY_FAILED,
        ],
        endpoint: endpoint,
        method: 'POST',
        data: data,
        schema: ENTRY,
      },
    });
  };
}


export function createUserEntry(userId, data, fields = []) {
  return createEntry('/admin-api/entries', data, fields);
}

export function createCurrentUserEntry(data, fields = []) {
  return createEntry('/v1/entries', data, fields);
}
