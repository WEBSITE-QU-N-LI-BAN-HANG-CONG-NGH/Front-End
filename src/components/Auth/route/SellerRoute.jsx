import React from 'react';
import ProtectedRoute from './ProtectedRoute';

const SellerRoute = ({ children }) => {
  return (
    <ProtectedRoute roles={['SELLER', 'ADMIN']}>
      {children}
    </ProtectedRoute>
  );
};

export default SellerRoute;