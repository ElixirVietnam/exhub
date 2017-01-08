import React, {Component, PropTypes} from 'react';


class TableHeader extends Component {

  render() {
    const { names } = this.props;

    return (
      <thead>
        <tr role="row">
          {
            names.map((name) => {
              return (
                <th key={name} className="sorting_asc" tabIndex="0" rowSpan="1" colSpan="1">
                  {name}
                </th>
              );
            })
          }
        </tr>
      </thead>
    );
  }

}

TableHeader.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableHeader;
