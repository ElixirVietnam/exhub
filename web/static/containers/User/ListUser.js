import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { fetchUsers, searchUser } from '../../actions/userAction';
import { renderDate } from '../../common/utils';

import Loading from '../../components/Common/Loading';
import Button from '../../components/Common/Button';
import FormIconInput from '../../components/Common/FormIconInput';
import Table from '../../components/Table';
import PanelHeader from '../../components/Panel/Header';
import PanelFooter from '../../components/Panel/Footer';


const FIELDS = [
  'id', 'name', 'username',
  'created_at', 'updated_at',
  'role_type', 'status',
];

const STATUS = {
  0: { label: 'active', type: 'success' },
  1: { label: 'deleted', type: 'danger' },
}

const ROLE_TYPE = {
  0: { label: 'normal', type: 'success' },
  1: { label: 'manager', type: 'warning' },
  2: { label: 'admin', type: 'danger' },
}

class ListUser extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { loggedUser, fetchUsers } = this.props;
    if (loggedUser.role_type == 0) {
      this.context.router.push('/dashboard');
    }
    else {
      fetchUsers(FIELDS);
    }
  }

  handleSearch(e) {
    e.preventDefault()
    const value = this.refs.search.refs.input.value;
    if (value) {
      this.props.searchUser(value, FIELDS);
    }
  }

  handleActionButton(value) {
    const { nextPageUrl, isSearched } = this.props;
    if (isSearched) {
      this.refs.search.refs.input.value = '';
      this.props.fetchUsers(FIELDS);
    } else {
      this.props.fetchUsers(FIELDS, nextPageUrl);
    }
  }

  renderUsername(name, row) {
    const { username, id } = row;
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

  renderRoleType(name, row) {
    const value = row[name];
    return (
      <span className={`label label-${ROLE_TYPE[value].type}`}>
        {ROLE_TYPE[value].label}
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
            'username', 'name',
            'role_type', 'status',
            'created_at', 'updated_at',
          ]}
          data={items}
          renderCreatedAt={renderDate}
          renderUpdatedAt={renderDate}
          renderUsername={::this.renderUsername}
          renderStatus={::this.renderStatus}
          renderRoleType={::this.renderRoleType}  />
    );
  }

  render() {
    const { items, isFetching, isSearched, nextPageUrl } = this.props;
    return (
      <div className="panel panel-default">
        <PanelHeader name="List users">
          <div id="example_filter" className="dataTables_filter pull-right">
			<form className="navbar-form navbar-left" onSubmit={::this.handleSearch}>
              <input type="submit" style={{display: "none"}} />
              <FormIconInput
                  ref="search"
                  isIconRight={true}
                  placeHolder="Search"
                  inputType="text"
                  icon="fa-fw fa-search"  />
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
            <Button
                isLoading={isFetching}
                isDisabled={isFetching || (!isSearched && !nextPageUrl)}
                style="btn-primary"
                value={ isSearched ? "Reset" : "Load more" }
                onClick={::this.handleActionButton}  />
          </PanelFooter>
        </div>
      </div>
    );
  }
}

ListUser.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool,
  isSearched: PropTypes.bool,
  nextPageUrl: PropTypes.string,
  fetchUsers: PropTypes.func,
  searchUser: PropTypes.func,
};

function mapUserDetail(id, state) {
  const { entities: { users } } = state;
  return users[id];
}

function mapStateToProps(state) {
  const {
    auth,
    entities,
    pages: { users }
  } = state;

  return {
    ...users,
    loggedUser: entities.users[auth.id],
    items: users.ids.map(id => state.entities.users[id])
  };
}

export default connect(mapStateToProps, {
  fetchUsers,
  searchUser,
})(ListUser);
