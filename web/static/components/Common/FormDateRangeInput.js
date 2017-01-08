import React, { Component, PropTypes } from 'react';


class FormDateRangeInput extends Component {

  render() {
    return (
	  <div className="form-group">
		<div className="col-sm-12">
          <div className="input-daterange input-group">
            <input type="text" placeholder="start" className="cols-sm-6 input-small form-control" ref="start" />
            <span className="input-group-addon">to</span>
            <input type="text" placeholder="end" className="cols-sm-6 input-small form-control" ref="end"  />
          </div>
		</div>
	  </div>
    );
  }
}

export default FormDateRangeInput;
