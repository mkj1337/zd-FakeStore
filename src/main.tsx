import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartContextProvider } from './context/CartContext';
import { ProductContextProvider } from './context/ProductContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProductContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </ProductContextProvider>
  </React.StrictMode>
);
