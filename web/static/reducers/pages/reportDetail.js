import { REPORTS } from '../../constants';

const initialState = {
  isFetching: false,
  errorMessage: null,
};

export default function (state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {

    case REPORTS.FETCH_REPORT_BY_ID_SUBMITTED:
      return {
        ...state,
        isFetching: true,
      };

    case REPORTS.FETCH_REPORT_BY_ID_SUCCEED:
      return {
        ...state,
        isFetching: false,
        errorMessage: null,
      };

    case REPORTS.FETCH_REPORT_BY_ID_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: payload.message,
      };

    default:
      return state;
  }
}
