import { union } from 'lodash';
import { REPORTS } from '../../constants';

const initialState = {
  ids: [],
  isFetching: false,
  nextPageUrl: null,
  errorMessage: null,
};

export default function (state = initialState, action = {}) {
  const { type, payload, shouldAppend, error } = action;

  switch (type) {

    case REPORTS.FETCH_LIST_REPORTS_SUBMITTED:
      return {
        ...state,
        ids: !shouldAppend ? [] : state.ids,
        isFetching: true,
        isSearched: false,
      };

    case REPORTS.FETCH_LIST_REPORTS_SUCCEED:
      return {
        ...state,
        isFetching: false,
        ids: !shouldAppend ? payload.result : union(state.ids, payload.result),
        nextPageUrl: payload.nextPageUrl,
      };

    case REPORTS.FETCH_LIST_REPORTS_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: error,
      };

    default:
      return state;
  }
}
