import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchUserEntries } from '../../actions/entryAction';
import ListEntry from '../../components/Entry/ListEntry';


class ListUserEntry extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { loggedUser } = this.props;
    if (loggedUser.role_type == 0) {
      this.context.router.push('/dashboard');
    }
  }

  fetchEntries() {
    const { fetchEntries, userId } = this.props;
    return (fields = [], filters = {}, nextPageUrl = null) => {
      return fetchEntries(userId, fields, filters, nextPageUrl);
    };
  }

  render() {
    return (
      <ListEntry
          {...this.props}
          title="User entries"
          fetchEntries={::this.fetchEntries()} />
    );
  }
}


function mapStateToProps(state, { params: { userId } }) {
  const {
    auth,
    entities,
    pages: { allEntries }
  } = state;

  return {
    ...allEntries,
    userId,
    loggedUser: entities.users[auth.id],
    items: allEntries.ids.map(id => state.entities.entries[id])
  };
}

export default connect(mapStateToProps, {
  fetchEntries: fetchUserEntries,
})(ListUserEntry);
