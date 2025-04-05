// src/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home1 from './components/Home/Home1';
import CatalogGridView1 from './components/Catalog/CatalogGridView1';
import CatalogListView1 from './components/Catalog/CatalogListView1';
import ContactUs1 from './components/ContactUs/ContactUs1';
import FAQ1 from './components/FAQ/FAQ1';
import Review1 from './components/Review/Review1';
import ProductDetail1 from './components/ProductDetail/ProductDetail1';
import ShoppingCart1 from './components/ShoppingCart/ShoppingCart1';
import UserAccount1 from './components/UserAccount/UserAccount1';
import Checkout1 from './components/Checkout/Checkout1';
import Checkout2 from './components/Checkout/Checkout2';
import Checkout3 from './components/Checkout/Checkout3';
import DashboardLayout from './adminComponents/Dashboard/Dashboard1';
import AccountManagement1 from './adminComponents/AccountManagement/AccountManagement1';
import RevenueAnalysis1 from './adminComponents/RevenueAnalysis/RevenueAnalysis1';

// Auth Pages
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import ForgotPasswordPage from './components/Auth/ForgotPasswordPage';
import UnauthorizedPage from './components/Auth/UnauthorizedPage';
import OAuthCallback from './components/Auth/OAuthCallback';

// Protected Routes
import ProtectedRoute from './components/Auth/route/ProtectedRoute';
import AdminRoute from './components/Auth/route/AdminRoute';
import SellerRoute from './components/Auth/route/SellerRoute';
import CustomerRoute from './components/Auth/route/CustomerRoute';

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home1 />} />
          <Route path="/catalog" element={<CatalogGridView1 />} />
          <Route path="/catalog-list" element={<CatalogListView1 />} />
          <Route path="/contact" element={<ContactUs1 />} />
          <Route path="/faq" element={<FAQ1 />} />
          <Route path="/product/:id" element={<ProductDetail1 />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path=" " element={<ForgotPasswordPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/oauth2/redirect" element={<OAuthCallback />} />

          {/* Protected Routes (User) */}
          <Route path="/cart" element={
            <CustomerRoute>
              <ShoppingCart1 />
            </CustomerRoute>
          } />
          <Route path="/checkout/info" element={
            <CustomerRoute>
              <Checkout1 />
            </CustomerRoute>
          } />
          <Route path="/checkout/payment" element={
            <CustomerRoute>
              <Checkout2 />
            </CustomerRoute>
          } />
          <Route path="/checkout/complete" element={
            <CustomerRoute>
              <Checkout3 />
            </CustomerRoute>
          } />
          <Route path="/account" element={
            <CustomerRoute>
              <UserAccount1 />
            </CustomerRoute>
          } />
          <Route path="/review" element={
            <CustomerRoute>
              <Review1 />
            </CustomerRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <DashboardLayout />
            </AdminRoute>
          } />
          <Route path="/admin/accounts" element={
            <AdminRoute>
              <AccountManagement1 />
            </AdminRoute>
          } />
          <Route path="/admin/revenue" element={
            <AdminRoute>
              <RevenueAnalysis1 />
            </AdminRoute>
          } />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;