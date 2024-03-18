import React from 'react';
import { createRoot } from 'react-dom/client'; // React 18 için güncellenmiş import
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const container = document.getElementById('root'); // Konteyneri al
const root = createRoot(container); // createRoot ile yeni bir root oluştur

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
