import React from 'react';
import ReactDOM from 'react-dom/client';
import ThemeProvider from './utils/ThemeContext';
import App from './App';
import { Provider } from "react-redux";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { store } from './store/configureStore';

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
