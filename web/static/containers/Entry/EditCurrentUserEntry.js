import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  fetchCurrentUserEntryById,
  updateCurrentUserEntryById,
  deleteCurrentUserEntryById,
} from '../../actions/entryAction';

import EntryDetail from '../../components/Entry/EntryDetail';


function mapStateToProps(state, { params: { entryId } } ) {
  const {
    auth,
    entities: { users, entries },
    pages: { entryDetail }
  } = state;
  const entry = entries[entryId] || {};

  return {
    ...entryDetail,
    entryId,
    entry,
    loggedUser: users[auth.id],
  };
}


export default connect(mapStateToProps, {
  fetchEntry: fetchCurrentUserEntryById,
  updateEntry: updateCurrentUserEntryById,
  deleteEntry: deleteCurrentUserEntryById,
})(EntryDetail);
