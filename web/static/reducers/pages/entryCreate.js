import { ENTRIES } from '../../constants';

const initialState = {
  entryId: null,
  isFetching: false,
  errorMessage: null,
};

export default function (state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {

    case ENTRIES.CREATE_ENTRY_SUBMITTED:
      return {
        ...state,
        isFetching: true,
      };

    case ENTRIES.CREATE_ENTRY_SUCCEED:
      return {
        ...state,
        entryId: payload.result,
        isFetching: false,
        errorMessage: null,
      };

    case ENTRIES.CREATE_ENTRY_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: payload.message,
      };

    default:
      return state;
  }
}
