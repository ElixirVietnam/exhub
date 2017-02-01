import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';

import Loading from '../../components/Common/Loading';


class GithubCallback extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { location: { query: { token } }, client } = this.props;
    const context = this.context;

    if (token) {
      const linkBeforeLogin = localStorage.getItem('linkBeforeLogin');
      localStorage.setItem('token', token);
      client.resetStore();

      // we need to set timeout in here to make sure localStorage is saved
      // before loading graphql again
      setTimeout(function() {
        context.router.push(linkBeforeLogin);
      }, 1000);
    }  else {
      window.location.href = '/auth/github';
    }
  }

  render() {
    return (
      <div className="col-md-9">
        <div className="panel panel-default">
          <div className="panel-body" style={{padding: "0px"}}>
            <Loading />
          </div>
        </div>
      </div>
    );
  }
}

export default withApollo(GithubCallback);
