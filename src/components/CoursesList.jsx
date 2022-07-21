import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import List from './common/List';

function CourseList(props) {
  const { courses, onDelete, itemsPerPage, authors } = props;
  const headers = ['Title', 'Author Name', 'Category'];

  function renderRow({ id, title, authorId, category, slug }) {
    return (
      <tr className="tr" key={id + Math.random()}>
        <td>
          <Link to={'/course/' + slug}>{title}</Link>
        </td>
        <td>{getAuthorName(authorId)}</td>
        <td>{category}</td>
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

  function getAuthorName(authorId) {
    return authors.find((author) => author.id === authorId)?.name || '';
  }

  return (
    <List
      data={courses}
      headers={headers}
      renderRow={renderRow}
      itemsPerPage={itemsPerPage}
    />
  );
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CourseList;
