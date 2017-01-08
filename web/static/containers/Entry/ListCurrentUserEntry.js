import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchCurrentUserEntries } from '../../actions/entryAction';
import ListEntry from '../../components/Entry/ListEntry';


class ListCurrentUserEntry extends Component {
  render() {
    return (
      <ListEntry
          {...this.props}
          title="Your entries"
          entryLinkPrefix="/users/me"  />
    );
  }
}


function mapStateToProps(state) {
  const {
    auth,
    entities,
    pages: { allEntries }
  } = state;

  return {
    ...allEntries,
    loggedUser: entities.users[auth.id],
    items: allEntries.ids.map(id => state.entities.entries[id])
  };
}

export default connect(mapStateToProps, {
  fetchEntries: fetchCurrentUserEntries,
})(ListCurrentUserEntry);
