import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';

import React, { Component, PropTypes } from 'react';

import { renderDate } from '../../common/utils';
import Loading from '../Common/Loading';
import FormLabelInput from '../Common/FormLabelInput';
import FormLabelLink from '../Common/FormLabelLink';
import FormChoiceInput from '../Common/FormChoiceInput';
import PanelHeader from '../Panel/Header';
import PanelFooter from '../Panel/Footer';


const FIELDS = [
  'id', 'user.id', 'user.username', 'user.role_type',
  'total_distance', 'total_duration', 'average_speed',
  'start_at', 'end_at',
  'created_at', 'updated_at', 'status',
];

const REPORT_STATUS = [
  { label: 'active', value: 0},
  { label: 'deleted', value: 1},
]

class ReportDetail extends Component {

  componentDidMount() {
    const { fetchReport, reportId } = this.props;
    fetchReport(reportId, FIELDS);
  }

  render() {
    const {
      isFetching,
      report,
      userLink,
      errorMessage,
    } = this.props;

    if (_.isEmpty(report)) {
      return (
        <Loading />
      );
    }

    return (
      <div className="panel panel-default">
        <PanelHeader name="Entry detail" />
        <div className="panel-body">
          <form action="" className="form-horizontal tabular-form">
            <FormLabelInput
                label="id"
                defaultValue={report.id}
                isDisable={true} />
            <FormLabelLink
                label="User"
                linkTo={userLink}
                content={report.user.username} />
            <FormLabelInput
                label="Total Distance"
                defaultValue={report.total_distance}
                isDisable={true} />
            <FormLabelInput
                label="Total Duration"
                defaultValue={report.total_duration}
                isDisable={true} />
            <FormLabelInput
                label="Average speed"
                defaultValue={report.average_speed}
                isDisable={true} />
            <FormLabelInput
                label="Start at"
                defaultValue={renderDate('start_at', report)}
                isDisable={true} />
            <FormLabelInput
                label="End at"
                defaultValue={renderDate('end_at', report)}
                isDisable={true} />
          </form>
        </div>
      </div>
    );
  }
}

ReportDetail.propTypes = {
  report: PropTypes.object,
  isFetching: PropTypes.bool,
  errorMessage: PropTypes.string,
  fetchReport: PropTypes.func,
  userLink: PropTypes.string,
};


export default ReportDetail;
