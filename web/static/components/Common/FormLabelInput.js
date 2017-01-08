import React, { Component, PropTypes } from 'react';

class FormLabelInput extends Component {

  state = {
    value: this.props.defaultValue,
    isError: false,
  }

  handleChange(e) {
    const { isValidate, normalize } = this.props;
    let value = e.target.value;

    if (value && normalize) {
      value = normalize(value);
    }

    if (isValidate && !isValidate(value)) {
      this.setState({
        ...this.state,
        value: value,
        isError: true
      });
    } else {
      this.setState({
        ...this.state,
        value: value,
        isError: false,
      })
    }
  }

  render() {
    const {
      label,
      defaultValue,
      isDisable,
      inputType,
      errorMessage
    } = this.props;
    const { isError, value } = this.state;
    const className = isError ? "form-group has-error" : "form-group";

    return (
      <div className={className}>
        <label className="control-label col-md-3">{label}</label>
        <div className="col-md-6 tabular-border">
          <input
              key={`labelInput-${label}-${defaultValue}`}
              ref="input"
              className="form-control"
              placeholder={label}
              type={inputType}
              defaultValue={defaultValue}
              value={value}
              onChange={::this.handleChange}
              onBlur={::this.handleChange}
              disabled={isDisable}  />
        </div>
        {
          isError
          ? (
            <div className="col-md-3">
              <p className="help-block">
                <i className="fa fa-times-circle"></i> {errorMessage}
              </p>
            </div>
          )
          : null
        }
      </div>
    );
  }
}

FormLabelInput.propTypes = {
  label: PropTypes.string.isRequired,
  isDisable: PropTypes.bool.isRequired,
  inputTye: PropTypes.string,
  defaultValue: PropTypes.any,
  errorMessage: PropTypes.string,
  isValidate: PropTypes.func,
  normalize: PropTypes.func,
};

FormLabelInput.defaultProps = {
  inputType: "text",
  defaultValue: "",
};


export default FormLabelInput;
