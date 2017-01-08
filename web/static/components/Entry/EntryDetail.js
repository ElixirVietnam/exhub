import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';

import React, { Component, PropTypes } from 'react';

import { renderDate } from '../../common/utils';
import Button from '../Common/Button';
import Loading from '../Common/Loading';
import FormLabelInput from '../Common/FormLabelInput';
import FormLabelLink from '../Common/FormLabelLink';
import FormDateInput from '../Common/FormDateInput';
import FormChoiceInput from '../Common/FormChoiceInput';
import PanelHeader from '../Panel/Header';
import PanelFooter from '../Panel/Footer';


const FIELDS = [
  'id', 'user.id', 'user.username', 'user.role_type',
  'distance', 'duration', 'average_speed',
  'start_at', 'end_at',
  'created_at', 'updated_at', 'status',
];

const ENTRY_STATUS = [
  { label: 'active', value: 0},
  { label: 'deleted', value: 1},
]

class EntryDetail extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { fetchEntry, entryId } = this.props;
    fetchEntry(entryId, FIELDS);
  }

  componentWillReceiveProps(nextProps) {
    const { loggedUser } = this.props;
    const { entry } = nextProps;
    if (loggedUser.role_type != 2 && loggedUser.id != entry.user.id) {
      this.context.router.push('/dashboard');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { entryId, updateEntry } = this.props;
    const distance = this.refs.distance.refs.input.value;
    const start_at = this.refs.startAt.refs.input.refs.inner.refs.valueInput.state.textValue;
    const end_at = this.refs.endAt.refs.input.refs.inner.refs.valueInput.state.textValue;
    const status = this.refs.status.refs.input.value;
    const data = { distance, status, start_at, end_at };
    updateEntry(entryId, FIELDS, data)
  }

  handleDelete() {
    const { deleteEntry, entryId } = this.props;
    deleteEntry(entryId, FIELDS);
  }

  normalizeDistance(value) {
    return Math.abs(numeral(value).value());
  }

  render() {
    const {
      isFetching,
      entry,
      loggedUser,
      errorMessage,
    } = this.props;

    if (_.isEmpty(entry)) {
      return (
        <Loading />
      );
    }

    return (
      <div className="panel panel-default">
        <PanelHeader name="Entry detail" />
        <div className="panel-body">
          <form action="" className="form-horizontal tabular-form" onSubmit={::this.handleSubmit}>
            <input type="submit" style={{display: "none"}} />
            <FormLabelInput
                label="id"
                defaultValue={entry.id}
                isDisable={true} />
            <FormLabelLink
                label="User"
                linkTo={`/users/${entry.user.id}`}
                content={entry.user.username} />
            <FormLabelInput
                ref="distance"
                label="Distance"
                defaultValue={entry.distance}
                isDisable={false}
                normalize={::this.normalizeDistance}  />
            <FormLabelInput
                label="Duration"
                key={`duration-${entry.duration}`}
                defaultValue={entry.duration}
                isDisable={true} />
            <FormLabelInput
                label="Average speed"
                key={`averageSpeed-${entry.average_speed}`}
                defaultValue={entry.average_speed}
                isDisable={true} />
            <FormDateInput
                ref="startAt"
                label="Start at"
                format="YYYY-MM-DD HH:mm:ss"
                timeFormat="HH:mm"
                defaultValue={moment(entry.start_at).toDate()} />
            <FormDateInput
                ref="endAt"
                label="End at"
                format="YYYY-MM-DD HH:mm:ss"
                timeFormat="HH:mm"
                defaultValue={moment(entry.end_at).toDate()} />
            <FormChoiceInput
                ref="status"
                label="Status"
                defaultValue={entry.status}
                options={ENTRY_STATUS}
                isDisable={false} />
            <FormLabelInput
                label="Created at"
                defaultValue={renderDate('created_at', entry)}
                isDisable={true} />
            <FormLabelInput
                label="Updated at"
                defaultValue={renderDate('created_at', entry)}
                isDisable={true} />
          </form>
          {
            errorMessage
            ? (
              <PanelFooter>
                <center>
                  <span>{errorMessage}</span>
                </center>
              </PanelFooter>
            )
            : null
          }
          <PanelFooter>
            <Button
                isLoading={isFetching}
                isDisabled={isFetching}
                style="btn btn-primary"
                value="Update"
                onClick={::this.handleSubmit}  />
            <Button
                isLoading={isFetching}
                isDisabled={isFetching}
                style="btn btn-danger"
                value="Delete"
                onClick={::this.handleDelete}  />
          </PanelFooter>
        </div>
      </div>
    );
  }
}

EntryDetail.propTypes = {
  loggedUser: PropTypes.object,
  entry: PropTypes.object,
  isFetching: PropTypes.bool,
  errorMessage: PropTypes.string,
  fetchEntry: PropTypes.func,
  updateEntry: PropTypes.func,
  deleteEntry: PropTypes.func,
};


export default EntryDetail;
