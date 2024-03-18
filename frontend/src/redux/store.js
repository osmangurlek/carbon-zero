// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import roleReducer from './roleSlice';
import workspaceReducer from './workspaceSlice'; // Ensure this import path matches your file structure
import userReducer from './userSlice'; // Ensure this import path matches your file structure
import emissionReducer from './emissionSlice'; // Ensure this import path matches your file structure

export const store = configureStore({
  reducer: {
    role: roleReducer,
    workspace: workspaceReducer,
    user: userReducer,
    emission: emissionReducer,
  },
});
