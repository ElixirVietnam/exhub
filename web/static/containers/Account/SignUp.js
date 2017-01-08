import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { resetAuth, signUpSubmitted } from '../../actions/authAction';
import FormIconInput from '../../components/Common/FormIconInput';
import Button from '../../components/Common/Button';


class SignUp extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const { authenticated } = this.props;
    if (authenticated) {
      this.context.router.push('/');
    } else {
      this.props.resetAuth();
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.signUpSubmitted({
      name: this.refs.name.refs.input.value,
      username: this.refs.username.refs.input.value,
      password: this.refs.password.refs.input.value,
    });
  }

  handleClickLogin(event) {
    this.context.router.push('/signin');
  }

  renderErrorMessage() {
    if (this.props.isError) {
      return (
        <div className="panel-footer">
          <div className="input-group">
            {this.props.errorMessage}
          </div>
        </div>
      );
    }
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div className="login-page container">
        <a className="login-logo"></a>
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-heading"><h2>Signup</h2></div>
              <div className="panel-body">
                <form className="form-horizontal" onSubmit={::this.handleSubmit}>
                  <input type="submit" style={{display: "none"}} />
                  <FormIconInput
                      ref="name"
                      placeHolder="Name"
                      inputType="text"
                      icon="fa-group"  />
                  <FormIconInput
                      ref="username"
                      placeHolder="Username"
                      inputType="text"
                      icon="fa-user"  />
                  <FormIconInput
                      ref="password"
                      placeHolder="Password"
                      inputType="password"
                      icon="fa-key"  />
                  {::this.renderErrorMessage()}
                  <div className="panel-footer">
                    <Button
                        isLoading={this.props.isLoading}
                        isDisabled={this.props.isLoading}
                        style="btn-primary pull-left"
                        value="Signup"
                        onClick={::this.handleSubmit}  />
                    <Button
                        isLoading={false}
                        isDisabled={false}
                        style="btn-danger pull-right"
                        value="Login"
                        onClick={::this.handleClickLogin}  />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  signUpSubmitted: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

SignUp.defaultProps = {
  isLoading: false,
};

function mapStateToProps(state) {
  const { auth } = state;

  return {
    ...auth
  };
}

export default connect(mapStateToProps, {
  resetAuth,
  signUpSubmitted,
})(SignUp);
