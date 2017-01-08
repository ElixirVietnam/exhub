import React, { Component, PropTypes } from 'react';

class FormIconInput extends Component {

  render() {
    const { isIconRight, placeHolder, icon, inputType } = this.props;

    return (
      <div className="form-group">
        <div className="col-xs-12">
          <div className="input-group">
            {
              !isIconRight
              ? (
                <span className="input-group-addon">
                  <i className={ `fa ${icon}` }></i>
                </span>
              )
              : null
            }
            <input
                ref="input"
                type={inputType}
                className="form-control"
                placeholder={placeHolder}
                required />
            {
              isIconRight
              ? (
                <span className="input-group-addon">
                  <i className={ `fa ${icon}` }></i>
                </span>
              )
              : null
            }
          </div>
        </div>
      </div>
    );
  }
}

FormIconInput.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  isIconRight: PropTypes.bool,
}

FormIconInput.defaultProps = {
  isIconRight: false,
};

export default FormIconInput;
