import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import PostListItem from '../../components/Post/PostListItem';


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
    posts: newestPosts ? newestPosts.edges : []
  }),
})(PostListItem);
