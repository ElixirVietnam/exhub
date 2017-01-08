import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';

import apiMiddleware from '../middleware/api';
import reducer from '../reducers';

export default function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(
      thunkMiddleware,
      apiMiddleware,
      routerMiddleware(browserHistory)
    )
  )(createStore);

  return finalCreateStore(reducer, initialState);
}
