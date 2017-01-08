import { USERS } from '../../constants';

const initialState = {
  userId: null,
  isFetching: false,
  errorMessage: null,
};

export default function (state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {

    case USERS.CREATE_USER_SUBMITTED:
      return {
        ...state,
        isFetching: true,
      };

    case USERS.CREATE_USER_SUCCEED:
      return {
        ...state,
        userId: payload.result,
        isFetching: false,
        errorMessage: null,
      };

    case USERS.CREATE_USER_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: payload.message,
      };

    default:
      return state;
  }
}
