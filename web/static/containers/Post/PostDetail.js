import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Markdown from 'react-remarkable';
import update from 'immutability-helper';

import PostItem from '../../components/Post/PostItem';
import Editor from '../../components/Common/Editor';


class PostDetail extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.string,
      link: PropTypes.string,
      thumbnailUrl: PropTypes.string,
      likesCount: PropTypes.number,
      commentsCount: PropTypes.number,
      tags: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      })),
      user: PropTypes.shape({
        username: PropTypes.string,
        imageUrl: PropTypes.string,
      }),
      insertedAt: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
    })
  }

  renderPostDetail() {
    return (
      <div className="panel panel-default topic">
        <div className="panel-body">
          <PostItem {...this.props.data.post} isDetail={true} />
          <div className="markdown-text mt20">
            <Markdown source={this.props.data.post.content} />
          </div>
        </div>
      </div>
    );
  }

  renderPostComments() {
    return (
      <div className="panel panel-default">
        <header className="panel-heading">Comments</header>
        <div className="panel panel-body">
          <ul className="media-list comments">
            {
              this.props.data.post.comments.edges.map(({ node }) => {
                return (
                  <li className="media" key={node.id}>
                    <a href="#" className="pull-left">
                      <img src={node.user.imageUrl} height="48" width="48" className="img-rounded" />
                    </a>
                    <div className="media-body">
                      <h5 className="media-heading"><a href="#" className="person">{node.user.username}</a></h5>
                      <Markdown source={node.content} />
                      <p><small className="time">{node.createdAt}</small></p>
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="col-md-9">
        {this.props.data.post && this.renderPostDetail()}
        {
          this.props.data.post &&
          <Editor
              title={"Reply"}
              postId={this.props.data.post.id}
              createComment={this.props.createComment} />
        }
        {this.props.data.post && this.props.data.post.comments.edges.length > 0 && this.renderPostComments()}
      </div>
    );
  }
}

const getPostQuery = gql`
query post($id: String!) {
  post(id: $id) {
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
    comments(first: 20) {
      edges {
        node {
          id
          user {
            username
            imageUrl
          }
          content
          likesCount
        }
      }
    }
  }
}
`;

const createCommentQuery = gql`
mutation createComment(
  $postId: String!
  $content: String!
) {
  createComment(input:{
    clientMutationId:"1",
    postId: $postId,
    content: $content,
  }) {
    comment {
      id
      user {
        username
        imageUrl
      }
      content
      likesCount
    }
  }
}
`;



const PostDetailWithData = compose(
  graphql(getPostQuery),
  graphql(createCommentQuery, {
    props: ({ ownProps, mutate }) => ({
      createComment: ({postId, content}) => {
        return mutate({
          variables: { postId, content },
          updateQueries: {
            post: (prev, { mutationResult }) => {
              const newComment = mutationResult.data.createComment;
              return update(prev, {
                post: {
                  comments: {
                    edges: {
                      $unshift: [{
                        __typename:"CommentEdge",
                        node: newComment.comment
                      }],
                    }
                  },
                },
              });
            },
          }
        });
      }
    })
  })
)(PostDetail);

class PostDetailContainer extends Component {
  render() {
    return (
      <PostDetailWithData id={this.props.params.postId}  />
    );
  }
}

export default PostDetailContainer;
