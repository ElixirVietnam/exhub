import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

import cookie from '../common/cookie';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    req.options.headers['x-exhub-token'] = cookie.get('auth');
    next();
  }
}]);

export const client = new ApolloClient({
  networkInterface,
});

export const reducer = combineReducers({
  routing,
  apollo: client.reducer(),
});
