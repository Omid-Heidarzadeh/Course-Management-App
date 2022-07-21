import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <>
      <h1>404</h1>
      <p>Page not found</p>
      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </>
  );
}

export default PageNotFound;
