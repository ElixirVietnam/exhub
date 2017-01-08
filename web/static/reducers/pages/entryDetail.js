import { ENTRIES } from '../../constants';

const initialState = {
  isFetching: false,
  errorMessage: null,
};

export default function (state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {

    case ENTRIES.UPDATE_ENTRY_BY_ID_SUBMITTED:
    case ENTRIES.FETCH_ENTRY_BY_ID_SUBMITTED:
      return {
        ...state,
        isFetching: true,
      };

    case ENTRIES.UPDATE_ENTRY_BY_ID_SUCCEED:
    case ENTRIES.FETCH_ENTRY_BY_ID_SUCCEED:
      return {
        ...state,
        isFetching: false,
        errorMessage: null,
      };

    case ENTRIES.UPDATE_ENTRY_BY_ID_FAILED:
    case ENTRIES.FETCH_ENTRY_BY_ID_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: payload.message,
      };

    default:
      return state;
  }
}
