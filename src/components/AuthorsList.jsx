import React from 'react';
import { Link } from 'react-router-dom';
import List from './common/List';
import PropTypes from 'prop-types';

function AuthorsList(props) {
  const { authors, itemsPerPage, onDelete } = props;
  const headers = ['Author Name', 'Author ID'];

  function renderRow({ id, name }, i) {
    return (
      <tr key={i + Math.random()}>
        <td>
          <Link to={'/author/' + id}>{name}</Link>
        </td>
        <td>{id}</td>
        <td>
          <button
            className="btn btn-outline-danger"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }

  return (
    <List
      data={authors}
      headers={headers}
      renderRow={renderRow}
      itemsPerPage={itemsPerPage}
    />
  );
}

AuthorsList.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AuthorsList;
