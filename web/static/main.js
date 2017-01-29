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
import cookie from './common/cookie';

const authStore = cookie.get('auth')
  ? JSON.parse(cookie.get('auth'))
  : undefined;

export const store = configureStore({
  auth: {
    authenticated: !!authStore,
    token: authStore ? authStore.token : undefined,
    id: authStore ? authStore.id : undefined,
  },
});


document.addEventListener('DOMContentLoaded', () => {

  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store);
  const getUrlParameter = (param) => {
    const name = param.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  render(
    <Root history={history} store={store} />,
    window.document.getElementById('route'));

});
