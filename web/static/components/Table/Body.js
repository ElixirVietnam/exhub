import _ from 'lodash';

import React, {Component, PropTypes} from 'react';


class TableBody extends Component {

  renderColumn(name, row, index) {
    const functionName = _.camelCase(`render_${name}`);
    const renderFunction = this.props[functionName];
    if (renderFunction) {
      return (
        <td key={name}>{renderFunction(name, row, index)}</td>
      );
    }
    return (
      <td key={name}>{row[name]}</td>
    );
  }

  renderRow(index, row, headers) {
    return (
      <tr key={index} className="gradeA odd" role="row">
        {
          headers.map(item => ::this.renderColumn(item, row, index))
        }
      </tr>
    );
  }

  render() {
    const { rows, headers } = this.props;

    return (
      <tbody>
        {
          rows.map((row, index) => ::this.renderRow(index, row, headers))
        }
      </tbody>
    );
  }

}

TableBody.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableBody;
