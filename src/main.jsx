// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 👈 1. Redux Provider와 Store import
import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 👈 2. Provider로 App 컴포넌트를 감싸고 store를 연결합니다. (표준) */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);