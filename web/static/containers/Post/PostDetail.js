import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Markdown from 'react-remarkable';

import PostItem from '../../components/Post/PostItem';
import Editor from '../../components/Common/Editor';


class PostDetail extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
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
        {this.renderPostDetail()}
        {this.renderPostComments()}
        <Editor title={"Reply"}  />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post:  {
      id: 1,
      author: "kiennt",
      title: "Elixir 1.4 is released. Elixir 1.4 is released. Elixir 1.4 is released. Elixir 1.4 is released. Elixir 1.4 is released. Elixir 1.4 is released. ",
      imageURL: "https://ph-files.imgix.net/ccdab0a7-678c-41bc-9e00-057714fa97ab?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop",
      content: `# This is h1
### what do you think

\`\`\`python
def function(param, *args):
  return
\`\`\`

[link](http://exhub.com)`,
      createdAt: "2017-01-01 20:22",
      likesCount: 30,
      commentsCount: 100,
      tags: ["elixir", "hardcore"],
      comments: [{
        id: 1,
        user: {
          name: "kiennt",
          imageURL: "https://avatars0.githubusercontent.com/u/381451?v=3&u=48785c661d78107991dcf6d6044931170947fcf2&s=400"
        },
        content: `## First
I believe this should be render to markdown
## Second
## Third

And here is a list

+ one
+ two
+ three`,
        createdAt: "2017-01-01 12:00"
      }, {
        id: 2,
        user: {
          name: "kiennt",
          imageURL: "https://avatars0.githubusercontent.com/u/381451?v=3&u=48785c661d78107991dcf6d6044931170947fcf2&s=400"
        },
        content: `## First
I believe this should be render to markdown
## Second
## Third

And here is a list

+ one
+ two
+ three`,
        createdAt: "2017-01-01 12:00"
      }, {
        id: 3,
        user: {
          name: "kiennt",
          imageURL: "https://avatars0.githubusercontent.com/u/381451?v=3&u=48785c661d78107991dcf6d6044931170947fcf2&s=400"
        },
        content: `## First
I believe this should be render to markdown
## Second
## Third

And here is a list

+ one
+ two
+ three`,
        createdAt: "2017-01-01 12:00"
      }, {
        id: 4,
        user: {
          name: "kiennt",
          imageURL: "https://avatars0.githubusercontent.com/u/381451?v=3&u=48785c661d78107991dcf6d6044931170947fcf2&s=400"
        },
        content: `## First
I believe this should be render to markdown
## Second
## Third

And here is a list

+ one
+ two
+ three`,
        createdAt: "2017-01-01 12:00"
      }]
    }
  };
}

export default connect(mapStateToProps, {
})(PostDetail);
