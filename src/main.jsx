// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './State/store.js'

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from './State/Auth/Action'; // Import action mới (hoặc đã có)


function AppInitializer() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Dispatch action kiểm tra trạng thái đăng nhập khi app mount
    dispatch(checkAuthStatus());
  }, [dispatch]);
  return null; // Component này không render gì cả
}


const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppInitializer /> {/* Thêm component khởi tạo */}
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);