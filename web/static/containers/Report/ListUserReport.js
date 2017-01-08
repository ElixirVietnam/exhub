import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchUserReports } from '../../actions/reportAction';
import ListReport from '../../components/Report/ListReport';


class ListUserReport extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { loggedUser } = this.props;
    if (loggedUser.role_type == 0) {
      this.context.router.push('/dashboard');
    }
  }

  fetchReports() {
    const { userId, fetchReports } = this.props;
    return (fields = [], filters = {}, nextPageUrl = null) => {
      return fetchReports(userId, fields, filters, nextPageUrl);
    }
  }

  render() {
    return (
      <ListReport
          {...this.props}
          title="User reports"
          fetchReports={::this.fetchReports()}  />
    );
  }

}


function mapStateToProps(state, { params: { userId } }) {
  const {
    auth,
    entities,
    pages: { allReports }
  } = state;

  return {
    ...allReports,
    userId,
    loggedUser: entities.users[auth.id],
    items: allReports.ids.map(id => state.entities.reports[id])
  };
}

export default connect(mapStateToProps, {
  fetchReports: fetchUserReports,
})(ListUserReport);
