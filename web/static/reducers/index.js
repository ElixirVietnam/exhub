import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';


const networkInterface = createNetworkInterface({
  uri: '/graphql',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    req.options.headers['x-exhub-token'] = localStorage.getItem('token');
    next();
  }
}]);

export const client = new ApolloClient({
  networkInterface,
  addTypename: true,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  }
});

export const reducer = combineReducers({
  routing,
  apollo: client.reducer(),
});
