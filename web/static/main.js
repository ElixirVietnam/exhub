import 'font-awesome-webpack';
import 'assets/less/template.less';
import 'assets/scss/style.less';

// alertifyjs
import 'alertifyjs/build/css/themes/default.css';
import 'alertifyjs/build/css/alertify.css';

// React Widget
import 'react-widgets/lib/less/react-widgets.less';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(moment);

import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import browserHistory from 'react-router/lib/browserHistory';

import Root from './containers/Root';
import configureStore from './store/configureStore';
import { client } from './reducers';

export const store = configureStore({});

document.addEventListener('DOMContentLoaded', () => {
  const history = syncHistoryWithStore(browserHistory, store);
  render(
    <Root history={history} store={store} client={client} />,
    window.document.getElementById('route'));

});
