import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchReportById } from '../../actions/reportAction';
import { fetchUserEntries } from '../../actions/entryAction';

import ReportDetail from '../../components/Report/ReportDetail';
import ListEntry from '../../components/Entry/ListEntry';


class EditReport extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { loggedUser } = this.props;
    if (loggedUser.role_type != 2) {
      this.context.router.push('/dashboard');
    }
  }

  handleListEntries() {
    const { report, fetchEntries } = this.props;
    return (fields, filters = {}, nextPageUrl = null) => {
      filters = {
        start: `${report.start_at} 00:00:00`,
        end: `${report.end_at} 23:59:59`,
      }
      return fetchEntries(report.user.id, fields, filters, nextPageUrl);
    };
  }

  render() {
    const { report } = this.props;

    return (
      <div>
        <ReportDetail
            {...this.props}
            {...this.props.reportDetail}
            userLink={`/users/${report.user.id}`}  />
        {
          report
          ? (
            <ListEntry
                {...this.props}
                {...this.props.allEntries}
                title="Entries"
                isAllowSearch={false}
                fetchEntries={::this.handleListEntries()}  />
          )
          : null
        }
      </div>
    );
  }

}

function mapStateToProps(state, { params: { reportId } } ) {
  const {
    auth,
    entities: { users, reports, entries },
    pages: { reportDetail, allEntries }
  } = state;

  return {
    reportDetail,
    allEntries,
    reportId,
    report: reports[reportId],
    loggedUser: users[auth.id],
    items: allEntries.ids.map(id => entries[id])
  };
}


export default connect(mapStateToProps, {
  fetchReport: fetchReportById,
  fetchEntries: fetchUserEntries,
})(EditReport);
