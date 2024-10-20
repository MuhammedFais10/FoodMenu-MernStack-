import React from 'react';
import classes from './NotFound.module.css';
import { Link } from 'react-router-dom';

function NotFound({ message = 'Nothing Found', linkRoute = '/', linkText = 'Go To Home Page' }) {
  return (
    <div className={classes.container}>
      {message}
      <Link to={linkRoute}>{linkText}</Link>
    </div>
  );
}

// NotFound.defaultProps = {
//   message: 'Nothing Found',
//   linkRoute: '/',
//   linkText: 'Go To Home Page',
// };

export default NotFound;
