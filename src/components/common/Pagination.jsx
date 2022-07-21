import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import paginationUtils from './paginationUtils';

function Pagination(props) {
  const { page, goToPage, numOfPages, ariaLabel } = props;
  const { pathname } = useLocation();
  const { getPageNumbers, renderNavButton, renderPageButtons } =
    paginationUtils({ page, goToPage, numOfPages, pathname });
  const pageNumbers = getPageNumbers(page, numOfPages);

  return !numOfPages || numOfPages <= 1 ? null : (
    <nav aria-label={ariaLabel}>
      <ul className="pagination">
        {renderNavButton('prev')}
        {renderPageButtons(pageNumbers)}
        {renderNavButton('next')}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  numOfPages: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired,
};

export default Pagination;
