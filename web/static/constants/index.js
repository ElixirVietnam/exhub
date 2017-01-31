import keyMirror from 'key-mirror';

export const APP_CONFIG = (__PROD__)
  ? require('./app_config.prod')
  : require('./app_config.dev');

export const AUTH = keyMirror({
  LOGIN_SUBMITTED: null,
  LOGIN_SUCCEED: null,
  LOGIN_FAILED: null,
});
