import { Schema, arrayOf } from 'normalizr';

const userSchema = new Schema('users');
const entrySchema = new Schema('entries');
const reportSchema = new Schema('reports');

module.exports = {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),

  ENTRY: entrySchema,
  ENTRY_ARRAY: arrayOf(entrySchema),

  REPORT: reportSchema,
  REPORT_ARRAY: arrayOf(reportSchema),
};
