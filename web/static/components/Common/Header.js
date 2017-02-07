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
      <Link to="/">
            <span className="text-hide">Elixir Vietnam</span>
            <span className="btn exhub-logo-text text-center">Eh</span>
          </Link>
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

  renderTopRightContent() {
    

    return (
        <section className="topnav-right-content d-flex">
      <form className="form-inline my-2 my-lg-0 mr-4 header-search d-flex justify-content-end">
        <input className="form-control mr-sm-2 w-75" type="text" placeholder="Search" />
      </form>
      <a className="btn btn-success btn-signin" href="#" onClick={this.props.handleLogin}>Sign In</a>
      </section>
    );
  }

  render() {
    return  (
      <header id="topnav" className="header-navbar-default fixed-top" role="banner">
        <section className="container">
          <section className="row topnav-container">
            <nav className="navbar navbar-toggleable-md navbar-content">
              <section className="navbar-brand topnav-left-logo mr-4">
                {this.renderLogo()}
              </section>
              <section className="topnav-left-categories mr-auto">
                <ul className="nav">
                {
                  this.props.categories.edges.map(({ node }) => {
                    return (
                      <li className="nav-item" key={node.name}><Link className="nav-link exhub-nav-link" activeClassName="active" to={`/categories/${node.name}`}><span>{node.name}</span></Link></li>
                    );
                  })
                }
                </ul>
              </section>
            <section className="topnav-right">
              {this.renderTopRightContent()}
            </section>
          </nav>
          </section>
        </section>
      </header>
    );
  }
}

export default Header;
