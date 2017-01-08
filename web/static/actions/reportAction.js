import _ from 'lodash';
import { REPORTS } from '../constants';
import { REPORT_ARRAY, REPORT } from '../schemas';
import { CALL_API } from '../middleware/api';


function fetchReports(path, fields = [], filters = {}, nextPageUrl = null) {
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
          REPORTS.FETCH_LIST_REPORTS_SUBMITTED,
          REPORTS.FETCH_LIST_REPORTS_SUCCEED,
          REPORTS.FETCH_LIST_REPORTS_FAILED,
        ],
        endpoint: endpoint,
        schema: REPORT_ARRAY,
      },
    });
  };
}


export function fetchAllReports(fields = [], filters = {}, nextPageUrl = null) {
  return fetchReports('/admin-api/reports', fields, filters, nextPageUrl);
}


export function fetchUserReports(userId, fields = [], filters = {}, nextPageUrl = null) {
  filters.user_key = userId;
  return fetchReports('/admin-api/reports', fields, filters, nextPageUrl);
}


export function fetchCurrentUserReports(fields = [], filters = {}, nextPageUrl = null) {
  return fetchReports('/v1/reports', fields, filters, nextPageUrl);
}


function fetchReport(path, fields = []) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();
    const selectedFields = fields.join(',');
    const requestUrl = `${path}?selected_fields=${selectedFields}&access_token=${token}`;

    return dispatch({
      [CALL_API]: {
        types: [
          REPORTS.FETCH_REPORT_BY_ID_SUBMITTED,
          REPORTS.FETCH_REPORT_BY_ID_SUCCEED,
          REPORTS.FETCH_REPORT_BY_ID_FAILED,
        ],
        endpoint: requestUrl,
        schema: REPORT,
      },
    });
  };
}


export function fetchReportById(id, fields = []) {
  return fetchReport(`/admin-api/reports/${id}`, fields);
}


export function fetchCurrentUserReportById(id, fields) {
  return fetchReport(`/v1/reports/${id}`, fields);
}
