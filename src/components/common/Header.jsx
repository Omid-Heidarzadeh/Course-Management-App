import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  const activeStyle = ({ isActive }) =>
    isActive ? { color: 'orange' } : undefined;

  return (
    <nav className="nav align-items-center">
      <NavLink to="/" className="nav-link" style={activeStyle}>
        Home
      </NavLink>
      {' | '}
      <NavLink to="/courses" className="nav-link" style={activeStyle}>
        Courses
      </NavLink>
      {' | '}
      <NavLink to="/authors" className="nav-link" style={activeStyle}>
        Authors
      </NavLink>
      {' | '}
      <NavLink to="/about" className="nav-link" style={activeStyle}>
        About
      </NavLink>
    </nav>
  );
}

export default Header;
