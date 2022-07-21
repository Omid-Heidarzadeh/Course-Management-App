import React, { useState, useEffect } from 'react';
import * as authorActions from '../actions/authorActions';
import AuthorsStore from '../stores/authorStore';
import AuthorsList from './AuthorsList';
import Pagination from './common/Pagination';
import { toast } from 'react-toastify';
import { Link, useSearchParams } from 'react-router-dom';

function AuthorsPage() {
  const [authors, setAuthors] = useState([]);

  // Number of authors per page
  const authorsPerPage = 5;

  // pagination props
  const numOfPages = Math.ceil(authors.length / authorsPerPage);
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(parseInt(query.get('page'), 10) || 1);

  // course list props
  const fromIndex = (page - 1) * authorsPerPage;
  const toIndex = fromIndex + authorsPerPage;

  useEffect(() => {
    AuthorsStore.addChangeListener(onChange);

    if (!AuthorsStore.hasLoaded()) authorActions.loadAuthors();
    else setAuthors(AuthorsStore.getAuthors());

    return () => AuthorsStore.removeChangeListener(onChange);
  }, []);

  function onChange() {
    setAuthors(AuthorsStore.getAuthors());
  }

  function handleDelete(id) {
    authorActions.deleteAuthor(id).then(() => {
      toast.success('Author deleted successfully.');
    });
  }

  function goToPage(value) {
    setPage(value);
    setQuery({ ...query, page: value });
  }

  return (
    <div className="container">
      <h2>Authors</h2>
      <Link to="/author" className="btn btn-primary">
        Add Author
      </Link>
      <AuthorsList
        authors={authors.slice(fromIndex, toIndex)}
        onDelete={handleDelete}
        itemsPerPage={authorsPerPage}
      />
      <Pagination
        ariaLabel="Authors list pages"
        page={page}
        numOfPages={numOfPages}
        goToPage={goToPage}
      />
    </div>
  );
}

export default AuthorsPage;
