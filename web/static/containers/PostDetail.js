import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import PostItem from '../components/Post/PostItem';
import Editor from '../components/Common/Editor';


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
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
            Big fan of Sketch here, but seriously folks - we're not gonna hunt every new software release that has 'Touchbar integration', are we? Or every new release of Sketch for that matter.
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
              [1, 2, 3, 4].map(() => {
                return (
                  <li className="media">
                    <a href="/users/327" className="pull-left">
                      <img src="https://cdn.v2ex.com/gravatar/a7f7c88fa402d2bc3facb23e138bc163" height="48" width="48" className="img-rounded" />
                    </a>
                    <div className="media-body">
                      <h5 className="media-heading"><a href="#" className="person">Jeremy Potter</a></h5>
                      <p>
                        that sounds good to me
                      </p>
                      <p><small className="time">5 days ago</small></p>
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

PostDetail.propTypes = {
  children: PropTypes.object,
};

function mapStateToProps(state) {
  const {
    auth,
    entities: { users },
  } = state;

  return {
    post:  {
      id: 1,
      author: "kiennt",
      title: "Elixir 1.4 is released. Elixir 1.4 is released. Elixir 1.4 is released. Elixir 1.4 is released. Elixir 1.4 is released. Elixir 1.4 is released. ",
      imageURL: "https://ph-files.imgix.net/ccdab0a7-678c-41bc-9e00-057714fa97ab?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop",
      content: "",
      createdAt: "2017-01-01 20:22",
      likesCount: 30,
      commentsCount: 100,
      tags: ["elixir", "hardcore"]
    }
  };
}

export default connect(mapStateToProps, {
})(PostDetail);
