import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { renderDateTime } from '../../common/utils';

import Loading from '../Common/Loading';
import Button from '../Common/Button';
import FormDateRangeInput from '../Common/FormDateRangeInput';
import PanelHeader from '../Panel/Header';
import PanelFooter from '../Panel/Footer';
import Table from '../Table';


const FIELDS = [
  'id', 'user.id', 'user.username',
  'distance', 'duration', 'average_speed',
  'start_at', 'end_at', 'status',
];


const STATUS = {
  0: { label: 'active', type: 'success' },
  1: { label: 'deleted', type: 'danger' },
}


class ListEntry extends Component {

  componentDidMount() {
    const { fetchEntries } = this.props;
    fetchEntries(FIELDS);
  }

  handleActionButton() {
    const { nextPageUrl, fetchEntries } = this.props;
    fetchEntries(FIELDS, {}, nextPageUrl);
  }

  handleSearch(e) {
    e.preventDefault()
    const { fetchEntries } = this.props;
    const data = {}
    data.start = this.refs.filter.refs.start.value;
    data.end = this.refs.filter.refs.end.value;
    fetchEntries(FIELDS, data);
  }

  renderIndex(name, row, index) {
    const { entryLinkPrefix } = this.props;
    const { id } = row;
    return (
      <Link to={`${entryLinkPrefix}/entries/${id}`}>
        {index + 1}
      </Link>
    )
  }

  renderUsername(name, row) {
    const { user: {id , username} } = row;
    return (
      <Link to={`/users/${id}`}>
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
            'duration',
            'distance',
            'average_speed',
            'start_at', 'end_at',
            'status',
          ]}
          data={items}
          renderIndex={::this.renderIndex}
          renderUsername={::this.renderUsername}
          renderStatus={::this.renderStatus}
          renderStartAt={renderDateTime}
          renderEndAt={renderDateTime}  />
    );
  }

  render() {
    const { title, items, isAllowSearch, isFetching, nextPageUrl } = this.props;
    return (
      <div className="panel panel-default">
        <PanelHeader name={title}>
          {
            isAllowSearch
            ? (
              <div id="example_filter" className="dataTables_filter pull-right">
                <form className="navbar-form navbar-left" onSubmit={::this.handleSearch}>
                  <input type="submit" style={{display: "none"}} />
                  <FormDateRangeInput ref="filter" />
                  <button onClick={::this.handleSearch} className="btn-primary btn">Filter</button>
                </form>
              </div>
            )
            : null
          }
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

ListEntry.propTypes = {
  title: PropTypes.string.isRequired,
  fetchEntries: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loggedUser: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  nextPageUrl: PropTypes.string,
  entryLinkPrefix: PropTypes.string,
  isAllowSearch: PropTypes.bool,
};


ListEntry.defaultProps = {
  entryLinkPrefix: '',
  isAllowSearch: true,
};


export default ListEntry;
