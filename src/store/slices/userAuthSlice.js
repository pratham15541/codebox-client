// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    emailOrUsername: '',
    active: false,
  },
  reducers: {
    setUsername: (state, action) => {
      state.emailOrUsername = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setUsername, setActive } = authSlice.actions;
export default authSlice.reducer;
