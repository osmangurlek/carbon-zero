// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    workspaceId: 0,
    roleId: 0,
    email: '',
    hashedPassword: '',
  },
  reducers: {
    setWorkspaceId: (state, action) => {
      state.workspaceId = action.payload;
    },
    setRoleId: (state, action) => {
      state.roleId = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setHashedPassword: (state, action) => {
      state.hashedPassword = action.payload;
    },
  },
});

export const { setWorkspaceId, setRoleId, setEmail, setHashedPassword } = userSlice.actions;
export default userSlice.reducer;