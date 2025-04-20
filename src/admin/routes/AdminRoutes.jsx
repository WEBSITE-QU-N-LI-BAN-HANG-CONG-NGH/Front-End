import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import Dashboard from '../pages/Dashboard';
import ProductManagement from '../pages/ProductManagement';
import OrderManagement from '../pages/OrderManagement';
import UserManagement from '../pages/UserManagement';
import AdminLogin from '../pages/AdminLogin';
import AdminRouteGuard from './AdminRouteGuard';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      
      <Route 
        path="/admin" 
        element={
          <AdminRouteGuard>
            <AdminLayout />
          </AdminRouteGuard>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="users" element={<UserManagement />} />
        {/* Thêm các routes khác nếu cần */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;