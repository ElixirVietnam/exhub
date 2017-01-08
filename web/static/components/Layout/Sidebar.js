import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import SidebarMenu from './SidebarMenu';
import SidebarItem from './SidebarItem';
import SidebarListItem from './SidebarListItem';


class Sidebar extends Component {

  renderUserMenu() {
    const { user } = this.props;
    if (user.role_type === 1 || user.role_type === 2) {
      return (
        <SidebarListItem className="fa-user" text="Users">
          <SidebarItem text="List users" linkTo="/users"  />
          <SidebarItem text="Create user" linkTo="/users/create"  />
        </SidebarListItem>
      );
    }
  }

  renderEntriesMenu() {
    const { user } = this.props;
    return (
      <SidebarListItem className="fa-check-square" text="Entries">
        {
          user.role_type == 2
          ? (
            <SidebarItem text="List all entries" linkTo="/entries"  />
          )
          : null
        }
        <SidebarItem text="Your entries" linkTo={`/users/me/entries`}  />
        <SidebarItem text="Create entry" linkTo="/entries/create"  />
      </SidebarListItem>
    );
  }

  renderReportsMenu() {
    const { user } = this.props;
    return (
      <SidebarListItem className="fa-bar-chart" text="Reports">
        {
          user.role_type == 2
          ? (
            <SidebarItem text="List all report" linkTo="/reports"  />
          )
          : null
        }
        <SidebarItem text="Your reports" linkTo={`/users/me/reports`}  />
      </SidebarListItem>
    );
  }

  render() {
    const { user } = this.props;

    return (
      <div className="static-sidebar-wrapper sidebar-inverse">
        <div className="static-sidebar">
          <div className="sidebar">
            <div className="widget stay-on-collapse">
              <div className="widget-body welcome-box tabular">
                <div className="tabular-row">
                  <div className="tabular-cell welcome-options">
                    <Link to="/">
                      <span className="name">{user.name}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="widget stay-on-collapse" id="widget-sidebar">
              <span className="widget-heading">Management</span>
              <SidebarMenu>
                {::this.renderUserMenu()}
                {::this.renderEntriesMenu()}
                {::this.renderReportsMenu()}
              </SidebarMenu>
              <span className="widget-heading">Settings</span>
              <SidebarMenu>
                <SidebarItem
                    className="fa-pencil"
                    text="Profile"
                    linkTo="/users/me"  />
                <SidebarItem
                    className="fa-sign-out"
                    text="Logout"
                    onTouch={this.props.logout}  />
              </SidebarMenu>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Sidebar;
