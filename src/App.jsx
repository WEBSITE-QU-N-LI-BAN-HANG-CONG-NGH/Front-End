// App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail1";
import Cart from "./pages/Cart/Cart";
import UserAccount from "./pages/UserAccount/UserAccount";
import Review from "./pages/Review/Review";
import ContactUs from "./pages/Contact/ContactUs";
import ContactedUs from "./pages/Contact/ContactedUs";
import Catalog from "./pages/Catalog/Catalog";
import NavigatePage from "./pages/NavigatePage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<NavigatePage />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/information/newsletter-subscription" element={<UserAccount />} />
        <Route path="/information/terms" element={<Review />} />
        <Route path="/information/contact-us" element={<ContactUs />} />
        <Route path="/information/contact-us/done" element={<ContactedUs />} />
        <Route path="/product/all" element={<Navigate to="/product/all/1" replace />} />
        <Route path="/product/all/:page" element={<Catalog />} />
      </Routes>
    </div>
  );
}

export default App;