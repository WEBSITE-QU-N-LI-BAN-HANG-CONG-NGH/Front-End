'use client'
import Home1 from './components/Home/Home1'
import CatalogGridView1 from './components/Catalog/CatalogGridView1'
import CatalogListView1 from './components/Catalog/CatalogListView1'
import ContactUs1 from './components/ContactUs/ContactUs1'
import "./App.css"
import Review1 from './components/Review/Review1'
import FAQ1 from './components/FAQ/FAQ1'
import React, { useState } from 'react'; // Ensure React and useState are properly imported
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering
import ProductDetail1 from './components/ProductDetail/ProductDetail1'
import ShoppingCart1 from './components/ShoppingCart/ShoppingCart1'
import UserAccount1 from './components/UserAccount/UserAccount1'
import Checkout1 from './components/Checkout/Checkout1'
import Checkout2 from './components/Checkout/Checkout2'
import Checkout3 from './components/Checkout/Checkout3'
import DashboardLayout from './adminComponents/Dashboard/Dashboard1'
import AccountManagement1 from './adminComponents/AccountManagement/AccountManagement1'
import RevenueAnalysis1 from './adminComponents/RevenueAnalysis/RevenueAnalysis1'


// Define App component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); // State to track the current page

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home1 />;
      case 'catalog':
        return <CatalogGridView1 />;
      case 'cataloglist':
        return <CatalogListView1 />;
      case 'contactus':
        return <ContactUs1 />;
      case 'faq':
        return <FAQ1 />;
      case 'review':
        return <Review1 />;
      case 'detail':
          return <ProductDetail1 />;
      case 'shoppingcart':
          return <ShoppingCart1 />;    
      case 'user':
          return <UserAccount1 />;    
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
      default:
        return <Home1 />;
    }
  };

  return (
    <>
      <nav>
        {/* Navigation buttons */}
        <button className="mr-5" onClick={() => setCurrentPage('home')}>Home</button>
        <button className="mr-5" onClick={() => setCurrentPage('catalog')}>CatalogGrid</button>
        <button className="mr-5" onClick={() => setCurrentPage('cataloglist')}>CatalogList</button>
        <button className="mr-5" onClick={() => setCurrentPage('contactus')}>ContactUs</button>
        <button className="mr-5" onClick={() => setCurrentPage('faq')}>FAQ</button>
        <button className="mr-5" onClick={() => setCurrentPage('review')}>Review</button>
        <button className="mr-5" onClick={() => setCurrentPage('detail')}>Product Detail</button>
        <button className="mr-5" onClick={() => setCurrentPage('user')}>User Account</button>
        <button className="mr-5" onClick={() => setCurrentPage('shoppingcart')}>Cart</button>
        <button className="mr-5" onClick={() => setCurrentPage('checkout1')}>Checkout 1</button>
        <button className="mr-5" onClick={() => setCurrentPage('checkout2')}>Checkout 2</button>
        <button className="mr-5" onClick={() => setCurrentPage('checkout3')}>Checkout 3</button>
        <button className="mr-5" onClick={() => setCurrentPage('adminaccount')}>ADMIN - Account</button>
        <button className="mr-5" onClick={() => setCurrentPage('admindashboard')}>ADMIN - Dashboard</button>
        <button className="mr-5" onClick={() => setCurrentPage('adminrevenue')}>ADMIN - Revenue Analysis</button>
      </nav>
      {/* Render the selected page */}
      {renderPage()}
    </>
  );
};

export default App
