// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Thêm các Route khác sau khi đã sửa lỗi cơ bản */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;