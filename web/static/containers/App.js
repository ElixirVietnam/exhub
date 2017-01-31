import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from '../components/Common/Loading';
import Header from '../components/Common/Header';
import TagPanel from '../components/Common/TagPanel';


class App extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  render() {
    const { loading } = this.props.data;
    if (loading) {
      return <Loading />
    }

    const { categories, tags } = this.props.data;
    const { currentUser } = this.props.userData;

    return (
      <div id="wrapper">
        <Header
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

App.propTypes = {
  children: PropTypes.object,
};

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

export default compose(
  graphql(UserQuery, { name: 'userData' }),
  graphql(AppQuery)
)(App);
