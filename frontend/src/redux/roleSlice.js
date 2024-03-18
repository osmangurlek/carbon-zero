// src/redux/roleSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const roleSlice = createSlice({
  name: 'role',
  initialState: {
    name: '',
    // Add additional state variables as needed
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    // Add additional reducers as needed
  },
});

export const { setName } = roleSlice.actions;

export default roleSlice.reducer;
