import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Main application component
import './styles/main.css';
import { BrowserRouter } from 'react-router-dom'; // 👈 import BrowserRouter

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* 👈 wrap App in router context */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);




