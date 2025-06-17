// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';           // → resolves to App.jsx or App.js
import './styles/index.css';       // ← Tailwind’s global CSS import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
