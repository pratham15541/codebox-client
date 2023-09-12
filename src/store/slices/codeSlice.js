import { createSlice } from "@reduxjs/toolkit";

const codeSlice = createSlice({
  name: "codeStore",
  initialState: {
    codeStore: "",
  },
  reducers: {
    setCodeForStore: (state, action) => {
      state.codeStore = action.payload;
    },
  },
});

export const { setCodeForStore } = codeSlice.actions;

export default codeSlice.reducer;
