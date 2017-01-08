import React, {Component, PropTypes} from 'react';

import TableHeader from './Header';
import TableBody from './Body';


class Table extends Component {

  render() {
    const { headers, data } = this.props;

    return (
      <table id="example" className="table table-striped table-bordered datatables dataTable no-footer" cellSpacing="0" role="grid" style={{width: "100%"}}>
        <TableHeader names={headers} />
        <TableBody
            {...this.props}
            headers={headers}
            rows={data} />
      </table>
    );
  }

}

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
