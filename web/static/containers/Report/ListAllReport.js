import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchAllReports } from '../../actions/reportAction';
import ListReport from '../../components/Report/ListReport';


class ListAllReport extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { loggedUser } = this.props;
    if (loggedUser.role_type == 0) {
      this.context.router.push('/dashboard');
    }
  }

  render() {
    return (
      <ListReport {...this.props} title="All reports"  />
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
  fetchReports: fetchAllReports,
})(ListAllReport);
