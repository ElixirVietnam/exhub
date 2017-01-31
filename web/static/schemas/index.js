import { Schema, arrayOf } from 'normalizr';

const accessTokenSchema = new Schema('accessToken');

module.exports = {
  ACCESS_TOKEN: accessTokenSchema,
};
