import { union } from 'lodash';
import { USERS } from '../../constants';

const initialState = {
  ids: [],
  isFetching: false,
  isSearched: false,
  pageCount: null,
  nextPageUrl: null,
  errorMessage: null,
};

export default function (state = initialState, action = {}) {
  const { type, payload, shouldAppend, error } = action;

  switch (type) {

    case USERS.FETCH_LIST_USERS_SUBMITTED:
      return {
        ...state,
        ids: !shouldAppend ? [] : state.ids,
        isFetching: true,
        isSearched: false,
      };

    case USERS.FETCH_LIST_USERS_SUCCEED:
      return {
        ...state,
        isFetching: false,
        ids: !shouldAppend ? payload.result : union(state.ids, payload.result),
        nextPageUrl: payload.nextPageUrl,
      };

    case USERS.FETCH_LIST_USERS_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: error,
      };


    case USERS.SEARCH_USER_SUBMITTED:
      return {
        ...state,
        nextPageUrl: null,
        ids: [],
        isFetching: true,
        isSearched: true,
      };

    case USERS.SEARCH_USER_SUCCEED:
      return {
        ...state,
        isFetching: false,
        ids: payload.result ,
      };

    case USERS.SEARCH_USER_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: error,
      };

    default:
      return state;
  }
}
