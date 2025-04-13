'use client'

import React, { useState } from 'react'; // Ensure React and useState are properly imported
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering
import Home from './Home/Home';
import Catalog from './Catalog/Catalog';
import ContactUs from './Contact/ContactUs';
import Review from './Review/Review';
import ProductDetail1 from './ProductDetail/ProductDetail1';
import Cart from './Cart/Cart';
import UserAccount from './UserAccount/UserAccount';

// Define NavigatePage component
const NavigatePage = () => {
  const [currentPage, setCurrentPage] = useState(null); // State to track the current page

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'catalog':
        return <Catalog />;
      case 'contactus':
        return <ContactUs />;
      case 'faq':
        return <FAQ1 />;
      case 'review':
        return <Review />;
      case 'detail':
          return <ProductDetail1 />;
      case 'shoppingcart':
          return <Cart />;    
      case 'user':
          return <UserAccount />;    
      case 'checkout1':
        return <Checkout1 />;    
      case 'checkout2':
        return <Checkout2 />;    
      case 'checkout3':
        return <Checkout3 />;    
      case 'adminaccount':
        return <AccountManagement1 />; 
      case 'admindashboard':
        return <DashboardLayout />; 
      case 'adminrevenue':
        return <RevenueAnalysis1 />; 
      case 'login':
        return <LoginForm />; 
      case 'register':
        return <RegisterForm />; 
      default:
        return null;
    }
  };

  return (
    <>
      <nav>
        {/* Navigation buttons */}
        <button className="mr-5" onClick={() => setCurrentPage('home')}>Home</button>
        <button className="mr-5" onClick={() => setCurrentPage('catalog')}>CatalogGrid</button>
        <button className="mr-5" onClick={() => setCurrentPage('contactus')}>ContactUs</button>
        <button className="mr-5 line-through" onClick={() => setCurrentPage('faq')}>FAQ</button>
        <button className="mr-5" onClick={() => setCurrentPage('review')}>Review</button>
        <button className="mr-5" onClick={() => setCurrentPage('detail')}>Product Detail</button>
        <button className="mr-5" onClick={() => setCurrentPage('user')}>User Account</button>
        <button className="mr-5" onClick={() => setCurrentPage('shoppingcart')}>Cart</button>
        <button className="mr-5 line-through" onClick={() => setCurrentPage('checkout1')}>Checkout 1</button>
        <button className="mr-5 line-through" onClick={() => setCurrentPage('checkout2')}>Checkout 2</button>
        <button className="mr-5 line-through" onClick={() => setCurrentPage('checkout3')}>Checkout 3</button>
        <button className="mr-5 line-through" onClick={() => setCurrentPage('adminaccount')}>ADMIN - Account</button>
        <button className="mr-5 line-through" onClick={() => setCurrentPage('admindashboard')}>ADMIN - Dashboard</button>
        <button className="mr-5 line-through" onClick={() => setCurrentPage('adminrevenue')}>ADMIN - Revenue Analysis</button>
        <button className="mr-5 line-through" onClick={() => setCurrentPage('login')}>Login</button>
        <button className="mr-5 line-through" onClick={() => setCurrentPage('register')}>Register</button>
      </nav>
      {/* Render the selected page */}
      {renderPage()}
    </>
  );
};

export default NavigatePage
