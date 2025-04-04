import React from 'react';
import ProtectedRoute from './ProtectedRoute';

const CustomerRoute = ({ children }) => {
  return (
    <ProtectedRoute roles={['CUSTOMER', 'SELLER', 'ADMIN']}>
      {children}
    </ProtectedRoute>
  );
};

export default CustomerRoute;