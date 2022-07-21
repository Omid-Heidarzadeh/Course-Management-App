import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function paginationUtils({
  page,
  numOfPages,
  goToPage,
  pathname,
}) {
  function getPageNumbers(currentPage, lastPage) {
    let first =
      currentPage === lastPage
        ? Math.max(1, currentPage - 2)
        : Math.max(1, currentPage - 1);
    let second = lastPage > first ? first + 1 : null;
    let third = lastPage > second ? second + 1 : null;

    return [first, second, third];
  }

  function getPageLinkTo(pageNumber) {
    let _query = new URL(window.location.href).searchParams;
    _query.set('page', Math.min(numOfPages, Math.max(1, pageNumber)));
    return `${pathname}?${_query.toString()}`;
  }

  function renderButton(page, content) {
    return (
      <Link
        className="page-link"
        to={getPageLinkTo(page)}
        onClick={() => goToPage(page)}
      >
        {content}
      </Link>
    );
  }

  function renderPageButtons(pageNumbers) {
    return pageNumbers.map((pageNumber, i) => {
      return (
        pageNumber && (
          <li
            key={i + Math.random()}
            className={`page-item ${page === pageNumber ? 'active' : ''}`}
          >
            {renderButton(pageNumber, pageNumber)}
          </li>
        )
      );
    });
  }

  function renderNavButton(value) {
    if (value === 'prev')
      return (
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          {renderButton(page - 1, '«')}
        </li>
      );

    if (value === 'next')
      return (
        <li className={`page-item ${page === numOfPages ? 'disabled' : ''}`}>
          {renderButton(page + 1, '»')}
        </li>
      );
  }

  return { renderNavButton, renderPageButtons, getPageNumbers };
}

paginationUtils.propTypes = {
  page: PropTypes.number.isRequired,
  numOfPages: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
};
