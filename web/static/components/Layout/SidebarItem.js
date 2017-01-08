import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';


class SidebarItem extends Component {

  handleClick(e) {
    if (this.props.onTouch) {
      this.props.onTouch(e);
    }
    else if (this.props.linkTo) {
      this.context.router.push(this.props.linkTo);
    }
  }

  render() {
    return (
      <li>
        <Link to={this.props.linkTo} onClick={::this.handleClick}>
          <i className={`fa ${this.props.className}`}></i>
          <span>{this.props.text}</span>
        </Link>
      </li>
    );
  }
}

SidebarItem.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  onTouch: PropTypes.func,
  linkTo: PropTypes.string,
};

SidebarItem.defaulProps = {
  className: ''
}

SidebarItem.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default SidebarItem;
