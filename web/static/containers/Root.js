import React, { PropTypes } from 'react';
import { Router } from 'react-router';
import { ApolloProvider } from 'react-apollo';

import ReactGA from 'react-ga';

import routes from '../routes';
import DevTools from './DevTools';

ReactGA.initialize('UA-16274581-12');

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

const Root = ({ store, history, client }) => (
  <ApolloProvider store={store} client={client}>
    <div>
      <Router
        history={history}
        routes={routes}
        onUpdate={logPageView}
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
