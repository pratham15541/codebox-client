import { createSlice } from "@reduxjs/toolkit";

const codeInputSlice = createSlice({
  name: "codeInput",
  initialState: {
    codeInput: "",
  },
  reducers: {
    setCodeInput: (state, action) => {
      state.codeInput = action.payload;
    },
  },
});

export const { setCodeInput } = codeInputSlice.actions;

export default codeInputSlice.reducer;
