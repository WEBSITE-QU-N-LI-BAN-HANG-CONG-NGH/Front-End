// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail1"
import Cart from "./pages/Cart/Cart"
import UserAccount from "./pages/UserAccount/UserAccount";
import Review from "./pages/Review/Review";
import ContactUs from "./pages/Contact/ContactUs";
import ContactedUs from "./pages/Contact/ContactedUs";

function App() {
  return (
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/information/newsletter-subscription" element={<UserAccount />} />
          <Route path="/information/terms" element={<Review />} />
          <Route path="/information/contact-us" element={<ContactUs />} />
          <Route path="/information/contact-us/done" element={<ContactedUs />} />
        </Routes>
      </div>
  );
}

export default App;