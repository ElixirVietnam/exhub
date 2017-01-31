import React, { PropTypes } from 'react';
import { Router } from 'react-router';
import { ApolloProvider } from 'react-apollo';

import routes from '../routes';
import DevTools from './DevTools';

const Root = ({ store, history, client }) => (
  <ApolloProvider store={store} client={client}>
    <div>
      <Router
        history={history}
        routes={routes}
      />
      <DevTools />
    </div>
  </ApolloProvider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
};

export default Root;
