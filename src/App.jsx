import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './pages/Home/Home';
import UserAccount from './pages/UserAccount/UserAccount';
import Cart from './pages/Cart/Cart';
import Catalog from './pages/Catalog/Catalog';
import ProductDetail1 from './pages/ProductDetail/ProductDetail1';
import ContactUs from './pages/Contact/ContactUs';
import ContactedUs from './pages/Contact/ContactedUs';
import Review from './pages/Review/Review';
import AppLayout from './components/layout/AppLayout';
import { FilterProvider } from './components/features/catalog/FilterContext';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import Checkout from './pages/Checkout/Checkout';
import OAuthRedirect from './pages/Auth/OAuthRedirect';
import { checkAuthStatus } from './State/Auth/Action';
import { isOAuthCallback, getCodeFromUrl } from './services/util';

function App() {
  const dispatch = useDispatch();
  
  // Kiểm tra trạng thái đăng nhập khi ứng dụng khởi động
  useEffect(() => {
    // Nếu URL hiện tại không phải là URL callback OAuth, 
    // kiểm tra trạng thái đăng nhập
    if (!isOAuthCallback()) {
      dispatch(checkAuthStatus());
    }
  }, [dispatch]);
  
  return (
    <div className="App">
      <FilterProvider>
        <Routes>
          {/* Route OAuth redirect - xử lý callback từ OAuth providers */}
          <Route path="/oauth2/redirect" element={<OAuthRedirect />} />
          <Route path="/oauth2/redirect/google" element={<OAuthRedirect />} />
          <Route path="/oauth2/redirect/github" element={<OAuthRedirect />} />
          
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="laptops" element={<Catalog category="laptops" />} />
            <Route path="desktop-computers" element={<Catalog category="desktops" />} />
            <Route path="accessories" element={<Catalog category="accessories" />} />
            <Route path="phones" element={<Catalog category="phones" />} />
            <Route path="computer-parts" element={<Catalog category="components" />} />
            <Route path="other-products" element={<Catalog category="others" />} />
            <Route path="our-deals" element={<Catalog category="deals" />} />
            <Route path="product/all/:page?" element={<Catalog />} />
            <Route path="detail/:productId" element={<ProductDetail1 />} />
            <Route path="account" element={<UserAccount />} />
            <Route path="cart" element={<Cart />} />
            <Route path="information/contact-us" element={<ContactUs />} />
            <Route path="information/contact-us/done" element={<ContactedUs />} />
            <Route path="review" element={<Review />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="profile" element={<UserAccount />} />
            <Route path="login" element={<Home />} />
            <Route path="sign-up" element={<Home />} />
          </Route>
        </Routes>
      </FilterProvider>
    </div>
  );
}

export default App;