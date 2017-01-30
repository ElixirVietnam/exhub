import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';


class PostItem extends Component {

  render() {
    return  (
      <div className="post-item">
        <Link to={`/posts/${this.props.id}`}>
          <div className="post-thumbnail">
            <img src={this.props.imageURL} />
          </div>
          <div className="post-content">
            <span className="post-title">{this.props.title}</span>
            <span className="post-description">{this.props.createdAt}</span>
          </div>
        </Link>
        <div className="post-meta">
          <div className="post-action-buttons">
            <a href="#" className="btn">
              <i className="fa fa-caret-up" style={{fontSize: "20px"}}></i>&nbsp;{this.props.likesCount}
            </a>
            <a href="#" className="btn">
              <i className="fa fa-comment-o"></i>&nbsp;{this.props.commentsCount}
            </a>
          </div>
          <div className="post-tags hidden-xs">
            {
              this.props.tags.map((name) => {
                return (
                  <Link to={`/tags/${name}`} className="btn" key={name}>{name}</Link>
                );
              })
            }
            <span>+3</span>
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  imageURL: PropTypes.string,
  likesCount: PropTypes.number,
  commentsCount: PropTypes.number,
  tags: PropTypes.arrayOf(PropTypes.string)
};

export default PostItem;
