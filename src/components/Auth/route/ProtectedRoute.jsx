import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, currentUser, loading } = useAuth();
  const   location = useLocation();

  // Kiểm tra xem component đã load xong chưa
  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Nếu có yêu cầu về vai trò và người dùng không có quyền, chuyển hướng đến trang lỗi
  if (roles.length > 0 && !roles.some(role => currentUser.roles.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Nếu đã đăng nhập và có quyền truy cập, hiển thị component con
  return children;
};

export default ProtectedRoute;