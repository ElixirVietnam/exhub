import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { logout, fetchCurrentUser } from '../actions/authAction';
import Sidebar from '../components/Layout/Sidebar';

function isRequiredAuth(pathName) {
  return !(pathName === '/signin' ||
           pathName === '/signup' ||
           pathName === '/logout');
}

class App extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const {
      loggedUser,
      isAuthenticated,
      location: { pathname },
    } = this.props;

    if (isRequiredAuth(pathname)) {
      this.checkAuth(isAuthenticated);
    }

    if (isAuthenticated) {
      this.props.fetchCurrentUser();
    }

    document.getElementsByTagName('body')[0].className = 'infobar-offcanvas';
  }

  componentWillReceiveProps(nextProps) {
    const { app } = this.props;
    if (isRequiredAuth(nextProps.location.pathname)) {
      this.checkAuth(nextProps.isAuthenticated);
    }
  }

  checkAuth(isAuthenticated) {
    if (!isAuthenticated) {
      this.context.router.push('/signin');
    }
  }

  renderComponents() {
    const {
      logout,
      isAuthenticated,
      loggedUser,
      children,
      location
    } = this.props;

    if (isAuthenticated && loggedUser) {
      return (
        <div>
          <div id="wrapper">
            <div id="layout-static">
              <Sidebar user={loggedUser} logout={logout} />
              <div className="static-content-wrapper">
                <div className="static-content">
                  <div className="page-content">
                    <div className="page-heading">
                      <h1>Toptal Project</h1>
                    </div>
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-12">
                        {children}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (!isRequiredAuth(location.pathname)) {
      return (
        <div>
          {children}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="toptal">
        {this.renderComponents()}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  loggedUser: PropTypes.object,
  fetchCurrentUser: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {
    auth,
    entities: { users },
  } = state;

  return {
    isAuthenticated: auth.authenticated,
    loggedUser: users[auth.id],
  };
}

export default connect(mapStateToProps, {
  fetchCurrentUser,
  logout,
})(App);
