import _ from 'lodash';
import React, { Component, PropTypes } from 'react';

import { renderDate } from '../../common/utils';

import Button from '../Common/Button';
import Loading from '../Common/Loading';
import FormLabelInput from '../Common/FormLabelInput';
import FormLabelLink from '../Common/FormLabelLink';
import FormChoiceInput from '../Common/FormChoiceInput';
import PanelHeader from '../Panel/Header';
import PanelFooter from '../Panel/Footer';


const FIELDS = [
  'id', 'name', 'username', 'password',
  'role_type', 'status',
  'created_at', 'updated_at'
];

const USER_ROLE_TYPES = [
  { label: 'normal', value: 0},
  { label: 'manager', value: 1},
  { label: 'admin', value: 2},
]

const USER_STATUS = [
  { label: 'active', value: 0},
  { label: 'deleted', value: 1},
]

class UserDetail extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { fetchUser, userId } = this.props;
    fetchUser(userId, FIELDS);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { userId, updateUser } = this.props;
    const name = this.refs.name.refs.input.value;

    if (::this.isValidateName(name)) {
      const data = { name };
      if (this.refs.roleType) {
        data.role_type = this.refs.roleType.refs.input.value;
      }
      if (this.refs.status) {
        data.status = this.refs.status.refs.input.value;
      }
      updateUser(userId, data, FIELDS)
    }
  }

  handleChangePassword() {
  }

  handleCreateEntry() {
    const { userId, loggedUser } = this.props;
    if (loggedUser.id == userId) {
      this.context.router.push('entries/create');
    } else {
      this.context.router.push(`/users/${userId}/entries/create`);
    }
  }

  handleDelete() {
    const { userId, deleteUser } = this.props;
    deleteUser(userId, FIELDS);
  }

  isValidateName(value) {
    return !_.isEmpty(value);
  }

  hasHigherPermission() {
    const { user, loggedUser } = this.props;
    return loggedUser.role_type > user.role_type;
  }

  hasUpdatePermission() {
    const { user, loggedUser } = this.props;
    return ::this.hasHigherPermission() || loggedUser.id == user.id;
  }

  hasDeletePermission() {
    const { user, loggedUser } = this.props;
    return ::this.hasHigherPermission() && user.id != loggedUser.id;
  }

  isManagerOrOwner() {
    const { user, loggedUser } = this.props;
    const isManager = loggedUser.role_type == 1 || loggedUser.role_type == 2;
    const isOwner = loggedUser.id == user.id;
    return isManager || isOwner;
  }

  isAdmin() {
    const { loggedUser } = this.props;
    return loggedUser.role_type == 2;
  }

  render() {
    const {
      isFetching,
      user,
      loggedUser,
      errorMessage,
      entriesLink,
      reportsLink
    } = this.props;

    if (_.isEmpty(user)) {
      return (
        <Loading />
      );
    }

    return (
      <div className="panel panel-default">
        <PanelHeader name="User detail">
          <div id="example_filter" className="dataTables_filter pull-right">
			<form className="navbar-form navbar-left">
              <Button
                  isLoading={false}
                  isDisabled={false}
                  style="btn btn-danger"
                  value="Create new entry"
                  onClick={::this.handleCreateEntry} />
            </form>
          </div>
        </PanelHeader>
        <div className="panel-body">
          <form action="" className="form-horizontal tabular-form" onSubmit={::this.handleSubmit}>
            <input type="submit" style={{display: "none"}} />
            <FormLabelInput
                label="Username"
                defaultValue={user.username}
                isDisable={true} />
            <FormLabelInput
                ref="name"
                label="Name"
                defaultValue={user.name}
                isDisable={!::this.hasUpdatePermission()}
                errorMessage="This field can not empty"
                isValidate={::this.isValidateName}  />
            {
              ::this.isAdmin()
              ? (
                <FormChoiceInput
                    ref="roleType"
                    label="Role type"
                    defaultValue={user.role_type}
                    options={USER_ROLE_TYPES}
                    isDisable={!::this.isAdmin()} />
              )
              : null
            }
            {
              ::this.hasDeletePermission()
              ? (
                <FormChoiceInput
                    ref="status"
                    label="Status"
                    defaultValue={user.status}
                    options={USER_STATUS}
                    isDisable={!::this.isAdmin()} />
              )
              : null
            }
            <FormLabelInput
                label="Created at"
                defaultValue={renderDate('created_at', user)}
                isDisable={true} />
            <FormLabelInput
                label="Updated at"
                defaultValue={renderDate('created_at', user)}
                isDisable={true} />
            <FormLabelLink
                label="Entries"
                linkTo={entriesLink}
                content={entriesLink}  />
            <FormLabelLink
                label="Reports"
                linkTo={reportsLink}
                content={reportsLink}  />
          </form>
          {
            errorMessage
            ? (
              <PanelFooter>
                <center>
                  <span>{errorMessage}</span>
                </center>
              </PanelFooter>
            )
            : null
          }
          <PanelFooter>
            {
              ::this.hasUpdatePermission()
              ? (
                <Button
                    isLoading={isFetching}
                    isDisabled={isFetching}
                    style="btn btn-primary"
                    value="Update"
                    onClick={::this.handleSubmit}  />
              )
              : null
            }
            {
              ::this.hasDeletePermission()
              ? (
                <Button
                    isLoading={isFetching}
                    isDisabled={isFetching}
                    style="btn btn-danger"
                    value="Delete"
                    onClick={::this.handleDelete}  />
              )
              : null
            }
          </PanelFooter>
        </div>
      </div>
    );
  }
}

UserDetail.propTypes = {
  userId: PropTypes.string.isRequired,
  loggedUser: PropTypes.object.isRequired,
  fetchUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  entriesLink: PropTypes.string.isRequired,
  reportsLink: PropTypes.string.isRequired,
  isFetching: PropTypes.bool,
  errorMessage: PropTypes.string,
  user: PropTypes.object,
  deleteUser: PropTypes.func,
};

export default UserDetail;
