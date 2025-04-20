import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRouteGuard = ({ children }) => {
  const location = useLocation();
  const adminToken = localStorage.getItem('adminToken');
  
  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (!adminToken) {
    // Chuyển hướng đến trang đăng nhập admin, lưu lại đường dẫn hiện tại
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  return children;
};

export default AdminRouteGuard;