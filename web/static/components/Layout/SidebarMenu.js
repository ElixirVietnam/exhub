import React, {Component, PropTypes} from 'react';


class SidebarMenu extends Component {
  render() {
    return (
      <nav role="navigation" className="widget-body">
        <ul className="acc-menu">
        {this.props.children}
        </ul>
      </nav>
    );
  }
}

export default SidebarMenu;
