import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userRole = user ? user.role : null;

  return (
    allowedRoles.includes(userRole)
      ? <Component {...rest} />
      : <Navigate to='/*' />
  );
};

export default ProtectedRoute
