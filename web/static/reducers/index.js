import _ from 'lodash';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { AUTH } from '../constants';
import auth from './auth';

import users from './pages/users';
import userDetail from './pages/userDetail';
import userCreate from './pages/userCreate';

import allEntries from './pages/allEntries';
import entryDetail from './pages/entryDetail';
import entryCreate from './pages/entryCreate';

import allReports from './pages/allReports';

const APP_STATE = {
  users: {},
  entries: {},
  reports: {},
};

const entities = (state = APP_STATE, action) => {
  if (action.payload && action.payload.entities) {
    return _.merge({}, state, action.payload.entities);
  }
  return state;
};

const initPage = combineReducers({
  users,
  userDetail,
  userCreate,

  allEntries,
  entryDetail,
  entryCreate,

  allReports,
});

const appReducer = combineReducers({
  auth,
  entities,
  pages: initPage,
  routing,
});

const rootReducer = (state, action) => {
  if (action.type === AUTH.LOGOUT) {
    return appReducer({
      ...state,
      entities: APP_STATE,
      pages: initPage,
    }, action);
  }

  return appReducer(state, action);
};

module.exports = rootReducer;
