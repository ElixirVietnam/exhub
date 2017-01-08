import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchUserById, updateUserById, deleteUserById } from '../../actions/userAction';
import UserDetail from '../../components/User/UserDetail';


class EditUser extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { loggedUser } = this.props;
    if (loggedUser.role_type == 0) {
      this.context.router.push('/dashboard');
    }
  }

  render() {
    const { userId } = this.props;

    return (
      <UserDetail
          {...this.props}
          entriesLink={`/users/${userId}/entries`}
          reportsLink={`/users/${userId}/reports`} />
    );
  }

}


function mapStateToProps(state, { params: { userId } } ) {
  const {
    auth,
    entities: { users },
    pages: { userDetail }
  } = state;
  const user = users[userId] || {};

  return {
    ...userDetail,
    userId,
    user,
    loggedUser: users[auth.id],
  };
}


export default connect(mapStateToProps, {
  fetchUser: fetchUserById,
  updateUser: updateUserById,
  deleteUser: deleteUserById,
})(EditUser);
