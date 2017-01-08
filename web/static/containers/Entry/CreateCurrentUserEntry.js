import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createCurrentUserEntry } from '../../actions/entryAction';
import CreateEntry from '../../components/Entry/CreateEntry';


class CreateCurrentUserEntry extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    const { entryId } = nextProps;
    if (entryId) {
      this.context.router.push(`/users/me/entries/${entryId}`);
    }
  }

  render() {
    return (
      <CreateEntry
          {...this.props}
          userLink="users/me"  />
    );
  }

}


function mapStateToProps(state) {
  const {
    auth,
    entities: { users },
    pages: { entryCreate }
  } = state;

  return {
    ...entryCreate,
    owner: users[auth.id],
    loggedUser: users[auth.id],
  };
}


export default connect(mapStateToProps, {
  createEntry: createCurrentUserEntry,
})(CreateCurrentUserEntry);
