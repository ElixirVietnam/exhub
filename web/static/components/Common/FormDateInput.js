import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import React, { Component, PropTypes } from 'react';


class FormDateInput extends Component {

  render() {
    const { label } = this.props;

    return (
	  <div className="form-group">
        <label className="control-label col-md-3">{label}</label>
        <div className="col-md-6 tabular-border">
          <DateTimePicker {...this.props} ref="input"  />
		</div>
	  </div>
    );
  }
}

export default FormDateInput;
