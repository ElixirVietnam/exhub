import { USERS } from '../../constants';

const initialState = {
  isFetching: false,
  errorMessage: null,
};

export default function (state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {

    case USERS.UPDATE_USER_BY_ID_SUBMITTED:
    case USERS.FETCH_USER_BY_ID_SUBMITTED:
      return {
        ...state,
        isFetching: true,
      };

    case USERS.UPDATE_USER_BY_ID_SUCCEED:
    case USERS.FETCH_USER_BY_ID_SUCCEED:
      return {
        ...state,
        isFetching: false,
        errorMessage: null,
      };

    case USERS.UPDATE_USER_BY_ID_FAILED:
    case USERS.FETCH_USER_BY_ID_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: payload.message,
      };

    default:
      return state;
  }
}
