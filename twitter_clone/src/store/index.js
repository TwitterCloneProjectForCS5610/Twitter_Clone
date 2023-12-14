import app from './app.js';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    app: app,
  },
});
