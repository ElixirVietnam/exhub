import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchCurrentUser, updateCurrentUser } from '../../actions/userAction';
import UserDetail from '../../components/User/UserDetail';


class UserProfile extends Component {

  render() {
    return (
      <UserDetail
          {...this.props}
          entriesLink="/users/me/entries"
          reportsLink="/users/me/reports" />
    );
  }

}


function mapStateToProps(state) {
  const {
    auth,
    entities: { users },
    pages: { userDetail }
  } = state;
  const user = users[auth.id] || {};

  return {
    ...userDetail,
    userId: auth.id,
    user,
    loggedUser: users[auth.id],
  };
}


export default connect(mapStateToProps, {
  fetchUser: (userId, fields) => {
    return fetchCurrentUser(fields);
  },
  updateUser: (userId, data, fields) => {
    return updateCurrentUser(data, fields);
  },
})(UserProfile);
