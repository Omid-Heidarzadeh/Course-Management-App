import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="jumbotron">
      <h1>Course Administartion</h1>
      <p>React, flux for ultra-responsive web apps</p>
      <Link to="about" className="btn btn-primary">
        about
      </Link>
    </div>
  );
}

export default HomePage;
