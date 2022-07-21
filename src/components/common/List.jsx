import React from 'react';
import PropTypes from 'prop-types';

function List(props) {
  const { data, headers, renderRow, itemsPerPage } = props;

  return (
    <div style={{ minHeight: `${4.564 * itemsPerPage}rem` }}>
      <table className="table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index + Math.random()}>{header}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>{data.map(renderRow)}</tbody>
      </table>
    </div>
  );
}

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  renderRow: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};

export default List;
