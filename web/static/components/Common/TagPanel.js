import React, {Component, PropTypes} from 'react';
import ReactGA from 'react-ga';
import { Link } from 'react-router';


class TagPanel extends Component {

  static propTypes = {
    tags: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
      })),
    }),
  }

  handleClickTag() {
    ReactGA.event({
      category: 'TagCloud',
      action: 'clickTagButton',
    });
  }

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
              <Link to={`/tags/${name}`} key={name} onClick={this.handleClickTag.bind(this)}>
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

export default TagPanel;
