// webContainerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const webContainerSlice = createSlice({
  name: 'webContainer',
  initialState: { instance: null, initialized: false },
  reducers: {
    setWebContainerInstance: (state, action) => {
      state.instance = action.payload;
      state.initialized = true;
    },
  },
});

export const { setWebContainerInstance } = webContainerSlice.actions;
export default webContainerSlice.reducer;
