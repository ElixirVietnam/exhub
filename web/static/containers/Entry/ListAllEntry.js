import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchAllEntries } from '../../actions/entryAction';
import ListEntry from '../../components/Entry/ListEntry';


class ListAllEntry extends Component {

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
      <ListEntry {...this.props} title="All entries"  />
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
  fetchEntries: fetchAllEntries,
})(ListAllEntry);
