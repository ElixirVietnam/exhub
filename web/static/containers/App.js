import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from '../components/Common/Loading';
import Header from '../components/Common/Header';
import TagPanel from '../components/Common/TagPanel';


class App extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  handleLogin() {
    const {
      props: { location: { pathname } },
      context: { router }
    } = this;

    localStorage.setItem('linkBeforeLogin', pathname);
    router.push('/auth/github/frontend_callback');
  }

  handleLogout() {
    const {
      props: { location: { pathname }, client },
      context: { router }
    } = this;

    localStorage.setItem('token', undefined);
    client.resetStore();

    // we need to set timeout in here to make sure localStorage is saved
    // before loading graphql again
    setTimeout(function() {
      router.push(pathname);
    }, 1000);
  }

  render() {
    const { loading } = this.props.data;
    if (loading) {
      return <Loading />
    }

    const {
      data: { categories, tags },
      userData: { currentUser }
    } = this.props;

    return (
      <div id="wrapper">
        <Header
            handleLogin={this.handleLogin.bind(this)}
            handleLogout={this.handleLogout.bind(this)}
            user={currentUser}
            categories={categories} />
          <div className="page-content" style={{paddingTop: "50px"}}>
          <div className="container" style={{paddingTop: "20px"}}>
            <div className="row blog">
              {this.props.children}
              <div className="col-md-3 hidden-xs">
                <TagPanel tags={tags} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const UserQuery = gql`
query {
  currentUser {
    username
    imageUrl
    notificationUnseenCount
    notifications(first: 10) {
      edges {
        node {
          link
          isSeen
          content
          updatedAt
        }
      }
    }
  }
}
`;


const AppQuery = gql`
query {
  categories(first: 100) {
    edges {
      node {
        name
      }
    }
  }
  tags(first: 100) {
    edges {
      node {
        name
      }
    }
  }
}
`;

export default withApollo(compose(
  graphql(UserQuery, { name: 'userData' }),
  graphql(AppQuery)
)(App));
