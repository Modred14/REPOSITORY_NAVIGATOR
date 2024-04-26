import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Not Found</h1>
      <p className="not-found-message">Sorry, the page you are looking for does not exist.</p>
      <p className="not-found-message">Go back to <Link className="not-found-link" to="/">homepage</Link>.</p>
    </div>
  );
};

export default NotFound;