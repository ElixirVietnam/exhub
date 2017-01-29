import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';


class TagCloud extends Component {

  render() {
    return  (
      <div className="panel panel-default hidden-xs">
        <div className="panel-heading">
          <h2>Tags</h2>
        </div>
        <div className="panel-body tag-cloud">
          {
            this.props.tags.map((name) => {
              return (
                <Link to={`/tags/${name}`} key={name}>
                  <span className="label label-alizarin m5">{name}</span>
                </Link>
              );
            })
          }
        </div>
      </div>
    );
  }
}

TagCloud.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string)
};

export default TagCloud;
