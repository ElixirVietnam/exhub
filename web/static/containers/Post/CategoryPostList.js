import React, { Component, PropTypes } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import PostListItem from '../../components/Post/PostListItem';


const getPostQuery = gql`
query($name: String!) {
  category(name:$name) {
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
  props: ({ ownProps, data: { loading, category } }) => ({
    loading,
    posts: category ? category.newestPosts.edges : []
  }),
})(PostListItem);


class PostListContainer extends Component {
  render() {
    console.log(this.props.params.name);

    return (
      <PostList name={this.props.params.name}  />
    );
  }
}

export default PostListContainer;
