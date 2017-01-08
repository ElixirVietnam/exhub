import _ from 'lodash';
import numeral from 'numeral';
import React, { Component, PropTypes } from 'react';

import { renderDate } from '../../common/utils';

import Button from '../Common/Button';
import Loading from '../Common/Loading';
import FormLabelInput from '../Common/FormLabelInput';
import FormLabelLink from '../Common/FormLabelLink';
import FormDateInput from '../Common/FormDateInput';
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
];

class CreateEntry extends Component {

  handleSubmit(e) {
    e.preventDefault();
    const { createEntry, owner } = this.props;
    const data = {
      user_key: owner.id,
      distance: this.refs.distance.refs.input.value,
      start_at: this.refs.startAt.refs.input.refs.inner.refs.valueInput.state.textValue,
      end_at: this.refs.endAt.refs.input.refs.inner.refs.valueInput.state.textValue,
    }
    createEntry(data, FIELDS);
  }

  normalizeDistance(value) {
    return Math.abs(numeral(value).value());
  }

  render() {
    const { isFetching, errorMessage, userLink, owner } = this.props;

    return (
      <div className="panel panel-default">
        <PanelHeader name="Create entry"  />
        <div className="panel-body">
          <form action="" className="form-horizontal tabular-form" onSubmit={::this.handleSubmit}>
            <input type="submit" style={{display: "none"}} />
            <FormLabelLink
                label="User"
                linkTo={userLink}
                content={owner.username} />
            <FormLabelInput
                ref="distance"
                label="Distance"
                isDisable={false}
                normalize={::this.normalizeDistance}  />
            <FormDateInput
                ref="startAt"
                label="Start at"
                format="YYYY-MM-DD HH:mm:ss"
                timeFormat="HH:mm" />
            <FormDateInput
                ref="endAt"
                label="End at"
                format="YYYY-MM-DD HH:mm:ss"
                timeFormat="HH:mm"  />
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
                style="btn btn-danger"
                value="Create"
                onClick={::this.handleSubmit}  />
          </PanelFooter>
        </div>
      </div>
    );
  }

}


CreateEntry.propTypes = {
  isFetching: PropTypes.bool,
  errorMessage: PropTypes.bool,
  createEntry: PropTypes.func,
  userLink: PropTypes.string,
  owner: PropTypes.object,
  entry: PropTypes.object,
};


export default CreateEntry;
