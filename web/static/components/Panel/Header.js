import React, {Component, PropTypes} from 'react';


class PanelHeader extends Component {

  render() {
    const { name, children } = this.props;

    return (
      <div className="panel-heading">
        <h2>{name}</h2>
        <div className="row">
          {children}
        </div>
      </div>
    );
  }

}

PanelHeader.propTypes = {
  name: PropTypes.string,
};

export default PanelHeader;
