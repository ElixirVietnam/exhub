import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';


class TagPanel extends Component {

  render() {
    return  (
      <div className="panel panel-default hidden-xs">
        <div className="panel-heading">
          <h2>Tags</h2>
        </div>
        <div className="panel-body tag-cloud">
        {
          this.props.tags.edges.map(({ node: { name } }) => {
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

TagPanel.propTypes = {
  tags: PropTypes.shape({
    edges: PropTypes.arrayOf(PropTypes.shape({
      node: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    })),
  }),
};

export default TagPanel;
