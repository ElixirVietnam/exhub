import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createUserEntry } from '../../actions/entryAction';
import { fetchUserById } from '../../actions/userAction';
import CreateEntry from '../../components/Entry/CreateEntry';
import Loading from '../../components/Common/Loading';


const USER_FIELDS = [
  'id', 'name', 'username', 'password',
  'role_type', 'status',
  'created_at', 'updated_at'
];


class CreateUserEntry extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { userId, owner, fetchUser } = this.props;
    if (!owner) {
      fetchUser(userId, USER_FIELDS);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { entryId } = nextProps;
    if (entryId) {
      this.context.router.push(`/users/me/entries/${entryId}`);
    }
  }

  render() {
    const { userId, owner } = this.props;

    if (!owner) {
      return (
        <Loading />
      );
    }

    return (
      <CreateEntry
          {...this.props}
          userLink="users/me"  />
    );
  }

}


function mapStateToProps(state, { params: { userId } }) {
  const {
    auth,
    entities: { users },
    pages: { entryCreate }
  } = state;

  return {
    ...entryCreate,
    userId,
    owner: users[userId],
    loggedUser: users[auth.id],
  };
}


export default connect(mapStateToProps, {
  createEntry: createUserEntry,
  fetchUser: fetchUserById,
})(CreateUserEntry);
