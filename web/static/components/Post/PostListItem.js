import React, { Component, PropTypes } from 'react';

import PostItem from './PostItem';


class PostListItem extends Component {

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
                this.props.posts.map(({ node: post }, index) => {
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

export default PostListItem;
