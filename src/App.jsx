import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import Checkout from './pages/Checkout/Checkout'; // Import trang Checkout

function App() {
  return (
    <div className="App">
      <FilterProvider>
        <Routes>
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
            <Route path="checkout" element={<Checkout />} /> {/* Thêm route cho trang Checkout */}
          </Route>

           {/* Admin Routes */}
           <Route path="/admin/*" element={<AdminRoutes />} />
           
        </Routes>
      </FilterProvider>
    </div>
  );
}

export default App;