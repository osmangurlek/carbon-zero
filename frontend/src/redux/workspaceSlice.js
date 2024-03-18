import { createSlice } from '@reduxjs/toolkit';

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: {
    name: '',
  },
  reducers: {
    setWorkspaceName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setWorkspaceName } = workspaceSlice.actions;
export default workspaceSlice.reducer;