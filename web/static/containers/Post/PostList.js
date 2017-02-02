import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import PostItem from '../../components/Post/PostItem';


class PostList extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className="col-md-9">
        <div className="panel panel-default">
          <div className="panel-body" style={{padding: "0px"}}>
            <section className="list-post">
              {
                this.props.posts &&
                this.props.posts.edges.map(({ node: post }, index) => {
                  return (
                    <PostItem {...post} key={index} />
                  );
                })
              }
            </section>
            <div className="clearfix" style={{padding: "0px 20px 0px 20px"}}>
              <ul className="pager">
                <li className="previous disabled"><a href="#">Previous</a></li>
                <li className="next"><a href="#">Next</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const getPostQuery = gql`
query {
  newestPosts(first: 20) {
    edges {
      node {
        id
        link
        thumbnailUrl
        likesCount
        commentsCount
        title
        content
        user {
          username
          imageUrl
        }
        tags {
          name
        }
      }
    }
  }
}
`;


export default graphql(getPostQuery, {
  options: {
    forceFetch: true,
  },
  props: ({ ownProps, data: { loading, newestPosts } }) => ({
    loading,
    posts: newestPosts
  }),
})(PostList);
