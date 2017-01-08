import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { renderDate } from '../../common/utils';

import Loading from '../Common/Loading';
import Button from '../Common/Button';
import FormDateRangeInput from '../Common/FormDateRangeInput';
import PanelHeader from '../Panel/Header';
import PanelFooter from '../Panel/Footer';
import Table from '../Table';


const FIELDS = [
  'id', 'user.id', 'user.username',
  'total_distance', 'total_duration', 'average_speed',
  'start_at', 'end_at', 'status',
];

const STATUS = {
  0: { label: 'active', type: 'success' },
  1: { label: 'deleted', type: 'danger' },
}


class ListReport extends Component {

  componentDidMount() {
    const { fetchReports } = this.props;
    fetchReports(FIELDS);
  }

  handleActionButton() {
    const { nextPageUrl, fetchReports } = this.props;
    fetchReports(FIELDS, {}, nextPageUrl);
  }

  handleSearch(e) {
    e.preventDefault()
    const { fetchReports } = this.props;
    const data = {}
    data.start = this.refs.filter.refs.start.value;
    data.end = this.refs.filter.refs.end.value;
    fetchReports(FIELDS, data);
  }

  renderIndex(name, row, index) {
    const { id } = row;
    const { reportLinkPrefix } = this.props;
    return (
      <Link to={`${reportLinkPrefix}/reports/${id}`}>
        {index + 1}
      </Link>
    )
  }

  renderUsername(name, row) {
    const { userLink } = this.props;
    const { user: {id, username} } = row;
    const link = userLink ? userLink : `/users/${id}`;
    return (
      <Link to={link}>
        {username}
      </Link>
    )
  }

  renderStatus(name, row) {
    const value = row[name];
    return (
      <span className={`label label-${STATUS[value].type}`}>
        {STATUS[value].label}
      </span>
    )
  }

  renderTable() {
    const { items } = this.props;

    if (_.isEmpty(items)) {
      return (
        <center>There is no result</center>
      );
    }
    return (
      <Table
          headers={[
            'index', 'username',
            'total_duration',
            'total_distance',
            'average_speed',
            'start_at', 'end_at',
            'status',
          ]}
          data={items}
          renderIndex={::this.renderIndex}
          renderUsername={::this.renderUsername}
          renderStatus={::this.renderStatus}
          renderStartAt={renderDate}
          renderEndAt={renderDate}  />
    );
  }

  render() {
    const { title, items, isFetching, nextPageUrl } = this.props;
    return (
      <div className="panel panel-default">
        <PanelHeader name={title}>
          <div id="example_filter" className="dataTables_filter pull-right">
			<form className="navbar-form navbar-left" onSubmit={::this.handleSearch}>
              <input type="submit" style={{display: "none"}} />
              <FormDateRangeInput ref="filter" />
              <button onClick={::this.handleSearch} className="btn-primary btn">Filter</button>
			</form>
          </div>
        </PanelHeader>
        <div className="panel-body panel-no-padding">
          <div id="colreorder_wrapper" className="dataTables_wrapper form-inline no-footer">
            <div className="row">
              <div className="col-sm-6"></div>
              <div className="col-sm-6"></div>
            </div>
            {::this.renderTable()}
            {
              isFetching ? <Loading /> : null
            }
          </div>
          <PanelFooter>
            {
              !isFetching && nextPageUrl
              ? (
                <Button
                    isLoading={isFetching}
                    isDisabled={isFetching || !nextPageUrl}
                    style="btn-primary"
                    value="Load more"
                    onClick={::this.handleActionButton}  />
              )
              : null
            }
          </PanelFooter>
        </div>
      </div>
    );
  }
}

ListReport.propTypes = {
  title: PropTypes.string.isRequired,
  fetchReports: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loggedUser: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  nextPageUrl: PropTypes.string,
  reportLinkPrefix: PropTypes.string,
  userLink: PropTypes.string,
};


ListReport.defaultProps = {
  reportLinkPrefix: ''
};


export default ListReport;
