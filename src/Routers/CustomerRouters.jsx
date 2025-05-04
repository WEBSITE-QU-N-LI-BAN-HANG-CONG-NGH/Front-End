import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import UserAccount from '../pages/UserAccount/UserAccount';
import UserOrders from '../pages/UserAccount/UserOrders';
import OrderDetail from '../pages/UserAccount/OrderDetail';
import Cart from '../pages/Cart/Cart';
import Catalog from '../pages/Catalog/Catalog';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import ContactUs from '../pages/Contact/ContactUs';
import ContactedUs from '../pages/Contact/ContactedUs';
import AppLayout from '../components/layout/AppLayout';
import { FilterProvider } from '../components/features/catalog/FilterContext';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Checkout from '../pages/Checkout/Checkout'; // Import trang Checkout

import OAuthRedirect from '../pages/Auth/OAuthRedirect';



const CustomerRouters = () => {
  return (
    <div>
      <FilterProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
          
            <Route index element={<Home />} />
            <Route path="laptop/:secondLevelCategory?/:page?" element={<Catalog category="laptop" />} />
            <Route path="desktop-computers/:secondLevelCategory?/:page?" element={<Catalog category="desktops" />} />
            <Route path="accessories/:secondLevelCategory?/:page?" element={<Catalog category="accessories" />} />
            <Route path="phone/:secondLevelCategory?/:page?" element={<Catalog category="phone" />} />
            <Route path="computer-parts/:secondLevelCategory?/:page?" element={<Catalog category="components" />} />
            <Route path="other-products/:secondLevelCategory?/:page?" element={<Catalog category="others" />} />

            <Route path="product/all/:page?" element={<Catalog category="all" />} /> {/* Hoặc không truyền category */}

            <Route path="product/:productId" element={<ProductDetail />} />
            
            <Route path="my-order" element={<UserOrders />} />
            
            <Route path="account" element={<UserAccount />} />
            
            <Route path="my-order/:orderId" element={<OrderDetail />} />

            <Route path="cart" element={<Cart />} />

            <Route path="information/contact-us" element={<ContactUs />} />

            <Route path="information/contact-us/done" element={<ContactedUs />} />

            <Route path="forgot-password" element={<ForgotPassword />} />

            <Route path="checkout" element={<Checkout />} /> {/* Thêm route cho trang Checkout */}

            <Route path="oauth2/redirect" element={<OAuthRedirect />} />

            {/* Thay đổi route tìm kiếm theo chuẩn query parameter */}
            <Route path="search" element={<Catalog category="all" />} />
            
            {/* Giữ lại route cũ để đảm bảo tương thích */}
            <Route path="search/search=:search/:page?" element={<Catalog category="all" />} />
          </Route>
        </Routes>
      </FilterProvider>
    </div>
  )
}

export default CustomerRouters