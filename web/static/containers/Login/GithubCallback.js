import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import cookie from '../../common/cookie';
import Loading from '../../components/Common/Loading';


class GithubCallback extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { location: { query: { token } } } = this.props;
    if (token) {
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      cookie.set({
        name: 'auth',
        value: token,
        expires,
      });

      this.context.router.push('/');
    }
  }

  render() {
    return (
      <div className="col-md-9">
        <div className="panel panel-default">
          <div className="panel-body" style={{padding: "0px"}}>
            <Loading />
          </div>
        </div>
      </div>
    );
  }
}

GithubCallback.propTypes = {};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
})(GithubCallback);
