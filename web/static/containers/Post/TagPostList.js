import React, { Component, PropTypes } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import PostListItem from '../../components/Post/PostListItem';


const getPostQuery = gql`
query($name: String!) {
  tag(name:$name) {
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
}
`;


const PostList = graphql(getPostQuery, {
  props: ({ ownProps, data: { loading, tag } }) => ({
    loading,
    posts: tag ? tag.newestPosts.edges : []
  }),
})(PostListItem);


class PostListContainer extends Component {
  render() {
    return (
      <PostList name={this.props.params.name}  />
    );
  }
}

export default PostListContainer;
