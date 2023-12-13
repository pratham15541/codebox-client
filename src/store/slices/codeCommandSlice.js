import { createSlice } from "@reduxjs/toolkit";

const codeCommandSlice = createSlice({
  name: "codeCommand",
  initialState: {
    codeCommand: "",
  },
  reducers: {
    setcodeCommand: (state, action) => {
      state.codeCommand = action.payload;
    },
  },
});

export const { setcodeCommand } = codeCommandSlice.actions;

export default codeCommandSlice.reducer;
