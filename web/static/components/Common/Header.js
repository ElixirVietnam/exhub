import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';


class Header extends Component {

  renderLogo() {
    return (
      <ul className="nav navbar-nav toolbar pull-left">
        <li>
          <Link to="/" className="username">
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
          <span className="badge badge-alizarin">5</span>
        </a>
        <div className="dropdown-menu notifications arrow">
          <div className="dd-header">
            <span>Notifications</span>
          </div>
          <ul className="scrollthis">
            <li>
              <a href="#" className="notification-success">
                <div className="notification-icon"><i className="fa fa-check fa-fw"></i></div>
                <div className="notification-content"><strong>Lorem ipsum</strong> dolor sit amet consectetur adipisicing elit!</div>
                <div className="notification-time">40m</div>
              </a>
            </li>
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
          <span className="hidden-xs">Kien Nguyen</span>
          <img className="img-circle" src="https://avatars0.githubusercontent.com/u/381451?v=3&u=48785c661d78107991dcf6d6044931170947fcf2&s=400" alt="Dangerfield" />
        </a>
        <ul className="dropdown-menu userinfo">
          <li className="divider"></li>
          <li><a href="#"><span className="pull-left">Sign Out</span> <i className="pull-right fa fa-sign-out"></i></a></li>
        </ul>
      </li>
    );
  }

  render() {
    return  (
      <header id="topnav" className="navbar navbar-default navbar-fixed-top clearfix" role="banner">
        <div className="container">
          <div className="row">
            {this.renderLogo()}
            <ul className="nav navbar-nav toolbar pull-right">
              {this.renderAddPostButton()}
              {this.renderNotificationButton()}
              {this.renderAvatarButton()}
            </ul>
          </div>
          <div style={{borderBottom: "1px solid #e6eaed"}}></div>
          <ul className="nav navbar-nav toolbar pull-left">
            <li><Link to="/"><span>Home</span></Link></li>
            <li><Link to="/posts"><span>Post</span></Link></li>
            <li><Link to="/jobs"><span>Jobs</span></Link></li>
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
