import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import PostItem from '../components/Post/PostItem';


class AllPosts extends Component {

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
                this.props.posts.map((post, index) => {
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

AllPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
};

function mapStateToProps(state) {
  const {
    auth,
    entities: { users },
  } = state;

  return {
    posts:  [{
      id: 1,
      createdAt: "2017-01-01 20:22",
      title: "Elixir 1.4 is released",
      imageURL: "https://ph-files.imgix.net/ccdab0a7-678c-41bc-9e00-057714fa97ab?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop",
      likesCount: 30,
      commentsCount: 100,
      tags: ["elixir", "hardcore"]
    }, {
      id: 2,
      createdAt: "2017-01-01 20:22",
      title: "Introduction about pattern matching",
      imageURL: "https://ph-files.imgix.net/6eb2f632-f961-47cd-a819-ae400bf286e3?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop",
      likesCount: 30,
      commentsCount: 100,
      tags: ["elixir", "hardcore"]
    }, {
      id: 3,
      createdAt: "2017-01-01 20:22",
      title: "Use This Flowchart to Identify What Type of Procrastinator You Are. Use This Flowchart to Identify What Type of Procrastinator You Are",
      imageURL: "https://ph-files.imgix.net/ccdab0a7-678c-41bc-9e00-057714fa97ab?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop",
      likesCount: 30,
      commentsCount: 100,
      tags: ["elixir", "hardcore"]
    }]
  };
}

export default connect(mapStateToProps, {
})(AllPosts);
