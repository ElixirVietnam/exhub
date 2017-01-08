import React, { Component, PropTypes } from 'react';

class Button extends Component {

  renderText() {
    if (this.props.isLoading) {
      return (
        <span>
          {this.props.value} <i className="fa fa-spinner fa-pulse" />
        </span>
      );
    } else {
      return (this.props.value);
    }
  }

  render() {
    return (
      <span
          onClick={this.props.onClick}
          disabled={this.props.isDisabled}
          className={`btn ${this.props.style}`}>
        {::this.renderText()}
      </span>
    );
  }
}

Button.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
