import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './State/store.js'
import React from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <Provider store={store}>
        <App />
      </Provider>

    </BrowserRouter>
  </StrictMode>,
)
