import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  fetchEntryById,
  updateEntryById,
  deleteEntryById,
} from '../../actions/entryAction';

import EntryDetail from '../../components/Entry/EntryDetail';


class EditEntry extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { loggedUser } = this.props;
    if (loggedUser.role_type != 2) {
      this.context.router.push('/dashboard');
    }
  }

  render() {
    return (
      <EntryDetail {...this.props} />
    );
  }

}

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
  fetchEntry: fetchEntryById,
  updateEntry: updateEntryById,
  deleteEntry: deleteEntryById,
})(EditEntry);
