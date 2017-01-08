import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import { HmacSHA256 } from 'crypto-js';
import { APP_CONFIG } from '../constants';

export function generateSignature(endpoint, params) {
  let s = endpoint;
  const keys = _(params).keys().sort().value();
  const secret = APP_CONFIG.API_SECRET;

  _.forIn(keys, (key) => {
    s += `|${key}=${params[key]}`;
  });

  return HmacSHA256(s, secret);
}


export function renderDate(name, row) {
  return moment(row[name]).format('YYYY-MM-DD');
}


export function renderDateTime(name, row) {
  return moment(row[name]).format('YYYY-MM-DD HH:mm:ss');
}
