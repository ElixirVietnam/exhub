import React, { Component, PropTypes } from 'react';

class FormChoiceInput extends Component {

  render() {
    const { label, defaultValue, options, isDisable } = this.props;
    return (
      <div className="form-group">
        <label className="control-label col-md-3">{label}</label>
        <div className="col-md-6 tabular-border">
          <select
              /*
               * XXX: Since changing `defaultValue` does not trigger React to
               * rerender, we make key of this component is depended on
               * `defaultValue`, which will maeke this component will be
               * re-initialize when we change `defaultValue`
               */
              key={`choiceInput-${label}-${defaultValue}`}
              ref="input"
              className="form-control"
              defaultValue={defaultValue}
              disabled={isDisable}>
            {
              options.map(option => <option key={option.label} value={option.value}>{option.label}</option>)
            }
          </select>
        </div>
      </div>
    );
  }
}

FormChoiceInput.propTypes = {
  label: PropTypes.string.isRequired,
  isDisable: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultValue: PropTypes.any,
}


export default FormChoiceInput;
