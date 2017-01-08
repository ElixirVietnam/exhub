import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';


class FormLabelLink extends Component {

  render() {
    const {
      label,
      linkTo,
      content,
    } = this.props;

    return (
      <div className="form-group">
        <label className="control-label col-md-3">{label}</label>
        <div className="col-md-6 tabular-border">
          <div className="form-control">
            <Link to={linkTo}>{content}</Link>
          </div>
        </div>
      </div>
    );
  }
}

FormLabelLink.propTypes = {
  label: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};


export default FormLabelLink;
