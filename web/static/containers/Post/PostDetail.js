import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Markdown from 'react-remarkable';

import PostItem from '../../components/Post/PostItem';
import Editor from '../../components/Common/Editor';


class PostDetail extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
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
          <PostItem {...this.props.post} />
          <div className="markdown-text mt20">
            <Markdown source={this.props.post.content} />
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
              this.props.post.comments.map((comment) => {
                return (
                  <li className="media" key={comment.id}>
                    <a href="#" className="pull-left">
                      <img src={comment.user.imageURL} height="48" width="48" className="img-rounded" />
                    </a>
                    <div className="media-body">
                      <h5 className="media-heading"><a href="#" className="person">{comment.user.name}</a></h5>
                      <Markdown source={comment.content} />
                      <p><small className="time">{comment.createdAt}</small></p>
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
        {this.props.post && this.renderPostDetail()}
        {this.props.post && this.props.post.comments.length > 0 && this.renderPostComments()}
        <Editor title={"Reply"}  />
      </div>
    );
  }
}

const getPostQuery = gql`
query($id: String!) {
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


const PostDetailWithData = graphql(getPostQuery, {
  props: ({ ownProps, data: { loading, post } }) => ({
    loading,
    post
  }),
})(PostDetail);

class PostDetailContainer extends Component {
  render() {
    return (
      <PostDetailWithData id={this.props.params.postId}  />
    );
  }
}

export default PostDetailContainer;
