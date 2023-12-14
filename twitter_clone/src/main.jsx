import 'antd/dist/reset.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import axios from 'axios';
import { message } from 'antd';

axios.interceptors.response.use(
  (res) => Promise.resolve(res.data),
  (err) => {
    if (err.response) {
      message.error(err.response.data);
    } else {
      message.error(err.message);
    }
    return Promise.reject(err);
  },
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
