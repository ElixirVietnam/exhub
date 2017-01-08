import { union } from 'lodash';
import { ENTRIES } from '../../constants';

const initialState = {
  ids: [],
  isFetching: false,
  nextPageUrl: null,
  errorMessage: null,
};

export default function (state = initialState, action = {}) {
  const { type, payload, shouldAppend, error } = action;

  switch (type) {

    case ENTRIES.FETCH_LIST_ENTRIES_SUBMITTED:
      return {
        ...state,
        ids: !shouldAppend ? [] : state.ids,
        isFetching: true,
        isSearched: false,
      };

    case ENTRIES.FETCH_LIST_ENTRIES_SUCCEED:
      return {
        ...state,
        isFetching: false,
        ids: !shouldAppend ? payload.result : union(state.ids, payload.result),
        nextPageUrl: payload.nextPageUrl,
      };

    case ENTRIES.FETCH_LIST_ENTRIES_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: error,
      };

    default:
      return state;
  }
}
