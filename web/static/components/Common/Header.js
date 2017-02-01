import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';


class Header extends Component {

  static propTypes = {
    data: PropTypes.shape({
      categories: PropTypes.shape({
        edges: PropTypes.arrayOf(PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string.isRequired,
          }),
        })),
      }),
    }),
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      notificationUnseenCount: PropTypes.number.isRequired,
      notifications: PropTypes.shape({
        edges: PropTypes.arrayOf(PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            isSeen: PropTypes.string.isRequire,
            content: PropTypes.string.isRequired,
            updatedAt: PropTypes.string.isRequired,
          }),
        })),
      }),
    }),
    handleLogin: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
  }

  renderLogo() {
    return (
      <ul className="nav navbar-nav toolbar pull-left">
        <li>
          <Link to="/" className="username">
            <span className="hidden-xs">ExHub</span>
            <img className="img-circle" src="https://cdn.worldvectorlogo.com/logos/product-hunt.svg" alt="Exhub" />
          </Link>
        </li>
      </ul>
    );
  }

  renderAddPostButton() {
    return (
      <li className="toolbar-icon-bg">
        <Link to="/posts/create">
          <span className="icon-bg"><i className="fa fa-fw fa-plus"></i></span>
        </Link>
      </li>
    );
  }

  renderNotificationButton() {
    return (
      <li className="dropdown toolbar-icon-bg">
        <a href="#" className="hasnotifications dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
          <span className="icon-bg"><i className="fa fa-fw fa-bell"></i></span>
          {
            this.props.user.notificationUnseenCount > 0
            ? <span className="badge badge-alizarin">{this.props.user.notificationUnseenCount}</span>
            : null
          }
        </a>
        <div className="dropdown-menu notifications arrow">
          <div className="dd-header">
            <span>Notifications</span>
          </div>
          <ul className="scrollthis">
            {
              this.props.user.notifications.edges.map(({ node }) => {
                return (
                  <li key={node.id}>
                    <a href="{node.link}" className="notification-success">
                      <div className="notification-icon"><i className="fa fa-check fa-fw"></i></div>
                      <div className="notification-content">{node.content}</div>
                      <div className="notification-time">{node.updatedAt}</div>
                    </a>
                  </li>
                );
              })
            }
          </ul>
          <div className="dd-footer">
            <a href="#">View all notifications</a>
          </div>
        </div>
      </li>
    );
  }

  renderAvatarButton() {
    return (
      <li className="dropdown">
        <a href="#" className="dropdown-toggle username" data-toggle="dropdown">
          <img className="img-circle" src={this.props.user.imageUrl} />
        </a>
        <ul className="dropdown-menu userinfo">
          <li className="divider"></li>
          <li>
            <a href="#" onClick={this.props.handleLogout}>
              <span className="pull-left">Sign Out</span>
              <i className="pull-right fa fa-sign-out"></i>
            </a>
          </li>
        </ul>
      </li>
    );
  }

  renderLoginButton() {
    return (
      <li className="toolbar-icon-bg">
        <a href="#" onClick={this.props.handleLogin}>
          <span className="icon-bg"><i className="fa fa-fw fa-sign-in"></i></span>
        </a>
      </li>
    );
  }

  renderHeader() {
    const { user } = this.props;
    if (!user) {
      return (
        <ul className="nav navbar-nav toolbar pull-right">
          {this.renderLoginButton()}
        </ul>
      );
    }

    return (
      <ul className="nav navbar-nav toolbar pull-right">
        {this.renderAddPostButton()}
        {this.renderNotificationButton()}
        {this.renderAvatarButton()}
      </ul>
    );
  }

  render() {
    return  (
      <header id="topnav" className="navbar navbar-default navbar-fixed-top clearfix" role="banner">
        <div className="container">
          <div className="row">
            {this.renderLogo()}
            {this.renderHeader()}
            <ul className="nav navbar-nav toolbar pull-left">
            {
              this.props.categories.edges.map(({ node }) => {
                return (
                  <li key={node.name}><Link to={`/categories/${node.name}`}><span>{node.name}</span></Link></li>
                );
              })
            }
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
