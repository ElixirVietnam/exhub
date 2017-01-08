import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createUser } from '../../actions/userAction';
import { renderDate } from '../../common/utils';

import Button from '../../components/Common/Button';
import Loading from '../../components/Common/Loading';
import FormLabelInput from '../../components/Common/FormLabelInput';
import FormChoiceInput from '../../components/Common/FormChoiceInput';
import PanelHeader from '../../components/Panel/Header';
import PanelFooter from '../../components/Panel/Footer';


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

class CreateUser extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    const { userId } = nextProps;
    if (userId) {
      this.context.router.push(`/users/${userId}`);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createUser } = this.props;
    const data = {
      name: this.refs.name.refs.input.value,
      username: this.refs.username.refs.input.value,
      password: this.refs.password.refs.input.value,
      role_type: this.refs.roleType.refs.input.value,
    }
    createUser(data, FIELDS);
  }

  isValidateName(value) {
    return !_.isEmpty(value) && value.length >= 3 && value.length <= 100;
  }

  isValidateUsername(value) {
    return (
      !_.isEmpty(value) &&
      value.length >= 3 &&
      value.length <= 100 &&
      /^[a-zA-Z0-9]+$/.test(value)
    );
  }

  isValidatePassword(value) {
    return !_.isEmpty(value) && value.length >= 6 && value.length <= 100;
  }


  isValidateConfirmPassword(value) {
    const password = this.refs.password.refs.input.value;
    return !_.isEmpty(value) && value.length >= 6 && value.length <= 100 && value == password;
  }

  isAdmin() {
    const { loggedUser } = this.props;
    return loggedUser.role_type == 2;
  }

  render() {
    const { isFetching, errorMessage } = this.props;

    return (
      <div className="panel panel-default">
        <PanelHeader name="Create user"  />
        <div className="panel-body">
          <form action="" className="form-horizontal tabular-form" onSubmit={::this.handleSubmit}>
            <input type="submit" style={{display: "none"}} />
            <FormLabelInput
                ref="name"
                label="Name"
                isDisable={false}
                errorMessage="Name must have 3 to 100 characters"
                isValidate={::this.isValidateName}  />
            <FormLabelInput
                ref="username"
                label="Username"
                isDisable={false}
                errorMessage="Username must have 3 to 100 characters and contains only number and alphabet characters"
                isValidate={::this.isValidateUsername}  />
            <FormLabelInput
                ref="password"
                label="password"
                inputType="password"
                isDisable={false}
                errorMessage="Password must have 6 to 100 characters"
                isValidate={::this.isValidatePassword}  />
            <FormLabelInput
                label="passwordConfirm"
                inputType="password"
                isDisable={false}
                errorMessage="Password does not match"
                isValidate={::this.isValidateConfirmPassword}  />
            {
              ::this.isAdmin()
              ? (
                <FormChoiceInput
                    ref="roleType"
                    label="Role type"
                    defaultValue="0"
                    options={USER_ROLE_TYPES}
                    isDisable={false} />
              )
              : null
            }
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
            <Button
                isLoading={isFetching}
                isDisabled={isFetching}
                style="btn btn-danger"
                value="Create"
                onClick={::this.handleSubmit}  />
          </PanelFooter>
        </div>
      </div>
    );
  }
}

CreateUser.propTypes = {
  loggedUser: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
  errorMessage: PropTypes.string,
};

function mapStateToProps(state) {
  const {
    auth,
    entities: { users },
    pages: { userCreate }
  } = state;

  return {
    ...userCreate,
    loggedUser: users[auth.id],
  };
}

export default connect(mapStateToProps, {
  createUser,
})(CreateUser);
