import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import TagSelectInput from '../../components/Common/TagSelectInput';


class PostCreate extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  handleCreatePost() {
    const context = this.context;
    const link = this.refs.link.value;
    const thumbnailUrl = this.refs.thumbnailUrl.value;
    const category = this.refs.category.value;
    const tagsList = this.refs.tags.refs.input._values.value || [];
    const tags = tagsList.join(',');
    const title = this.refs.title.value;
    const content = this.refs.content.value;

    if (title && content) {
      this.props.mutate({
        variables: {
          link,
          thumbnailUrl,
          category,
          tags,
          title,
          content
        }
      })
      .then(({ data }) => {
        const postId = data.createPost.post.id;
        context.router.push(`/posts/${postId}`);
      })
      .catch((error) => {
        alert(error);
      })
    }
  }

  render() {
    const tags = this.props.data.tags.edges.map(({ node }) => node.name);

    return (
      <div className="col-md-9">
        <div className="panel panel-default">
          <div className="panel-heading">
				    <h2>Create post</h2>
			    </div>
          <div className="panel-body">
            <form action="#" id="wizard" className="form-horizontal">
  						<div className="form-group">
  							<label className="col-md-2 control-label">Link</label>
  							<div className="col-md-10">
  								<input
                      className="form-control"
                      type="text"
                      ref="link"
                      placeholder="Paste a URL (e.g https://news.ycombinator.com)" />
  							</div>
  						</div>
              <div className="form-group">
                <label className="col-md-2 control-label">Thumbnail URL</label>
                <div className="col-md-10">
                  <input
                      className="form-control"
                      type="text"
                      ref="thumbnailUrl"
                      placeholder="Paste a URL (e.g https://news.ycombinator.com)" />
                </div>
              </div>
              <div className="form-group">
      					<label className="col-md-2 control-label">Category</label>
      					<div className="col-md-10">
      						<select className="form-control" ref="category">
                    {
                      this.props.data.categories.edges.map(({ node }) => (
                        <option value={node.name} key={node.name}>{node.name}</option>
                      ))
                    }
      						</select>
      					</div>
      				</div>
              <div className="form-group">
                <label className="col-md-2 control-label">Tags</label>
                <div className="col-md-10">
                  <TagSelectInput tags={tags} ref="tags" />
                </div>
              </div>
  						<div className="form-group">
  							<label className="col-md-2 control-label">Title</label>
  							<div className="col-md-10">
                  <input className="form-control"
                      type="text"
                      ref="title"
                      placeholder="Name of the link you want to share (e.g How discord handle millions push notifications with Elixir)" />
                </div>
  						</div>
  						<div className="form-group">
  							<label className="col-md-2 control-label">Content</label>
  							<div className="col-md-10">
                  <textarea
                      style={{resize: "vertical", width: "100%", height: "200px"}}
                      ref="content"
                      placeholder="Your thought in markdown format...">
                  </textarea>
                </div>
  						</div>
              <div className="panel-footer">
                <div className="pull-right">
                  <a href="#" className="btn btn-primary" onClick={this.handleCreatePost.bind(this)}>
                    Create
                  </a>
                </div>
              </div>
    			  </form>
    			</div>
        </div>
      </div>
    );
  }
}

const createPostQuery = gql`
mutation createPost(
  $category: String!,
  $tags: String,
  $link: String,
  $thumbnailUrl: String,
  $title: String!,
  $content: String!
) {
  createPost(input:{
    clientMutationId:"1",
    category:$category,
    tags:$tags,
  	link:$link,
    thumbnailUrl:$thumbnailUrl,
    title:$title,
    content:$content,
  }) {
    post {
      id
    }
  }
}`;


const getTagsAndCategoriesQuery = gql`
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
  graphql(createPostQuery),
  graphql(getTagsAndCategoriesQuery)
)(PostCreate);
