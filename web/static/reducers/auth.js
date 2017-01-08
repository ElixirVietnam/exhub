import { AUTH } from '../constants';
import cookie from '../common/cookie';


const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: undefined,
  authenticated: false,
  token: undefined,
  id: undefined,
};

function saveAuthToken(id, token) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookie.set({
    name: 'auth',
    value: JSON.stringify({
      id,
      token,
    }),
    expires,
  });
}

export default function(state = initialState, action = {}) {
  const { payload, type } = action;

  switch (type) {
    case AUTH.RESET:
      return initialState;
    case AUTH.FETCH_PROFILE:
    case AUTH.LOGIN_SUBMITTED:
      return {
        ...state,
        isLoading: true,
      };

    case AUTH.FETCH_PROFILE_SUCCEED:
    case AUTH.LOGIN_SUCCEED:
      const { entities: { users }, result } = payload;
      const { access_token: { value }, id } = users[result];
      saveAuthToken(id, value);

      return {
        ...state,
        id,
        token: value,
        isLoading: false,
        authenticated: true,
      };

    case AUTH.FETCH_PROFILE_FAILED:
    case AUTH.LOGIN_FAILED:
      const { message: errorMessage } = payload;

      return {
        ...state,
        errorMessage: errorMessage,
        isLoading: false,
        isError: true,
      };

    case AUTH.LOGOUT:
      cookie.unset('auth');
      return initialState;

    default:
      return state;
  }
}
