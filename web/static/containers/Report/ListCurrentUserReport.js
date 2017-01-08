import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchCurrentUserReports } from '../../actions/reportAction';
import ListReport from '../../components/Report/ListReport';


class ListCurrentUserReport extends Component {

  render() {
    return (
      <ListReport
          {...this.props}
          title="Your reports"
          reportLinkPrefix="/users/me"
          userLink="/users/me"  />
    );
  }

}


function mapStateToProps(state) {
  const {
    auth,
    entities,
    pages: { allReports }
  } = state;

  return {
    ...allReports,
    loggedUser: entities.users[auth.id],
    items: allReports.ids.map(id => state.entities.reports[id])
  };
}

export default connect(mapStateToProps, {
  fetchReports: fetchCurrentUserReports,
})(ListCurrentUserReport);
