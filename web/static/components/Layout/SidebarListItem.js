import $ from 'jquery';
import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';


class SidebarListItem extends Component {

  handleClick(e) {
    const $li = $(e.target).parent();

    if ($li.hasClass('open')) {
      $li.removeClass('open');
    } else {
      $li.addClass('open');
    }

    e.preventDefault();
  }

  render() {
    return (
      <li className="hasChild open">
        <Link to="#" onClick={::this.handleClick}>
          <i className={`fa ${this.props.className}`}></i>
          <span>{this.props.text}</span>
        </Link>
        <ul className="acc-menu">
          {this.props.children}
        </ul>
      </li>
    );
  }
}

SidebarListItem.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
};

SidebarListItem.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default SidebarListItem;
