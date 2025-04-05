import React from 'react';
import ProtectedRoute from './ProtectedRoute';

const AdminRoute = ({ children }) => {
  return (
    <ProtectedRoute roles={['ADMIN', 'CUSTOMER']}>
      {children}
    </ProtectedRoute>
  );
};

export default AdminRoute;