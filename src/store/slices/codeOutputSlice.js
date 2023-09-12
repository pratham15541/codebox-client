import { createSlice } from "@reduxjs/toolkit";

const codeOutputSlice = createSlice({
  name: "codeOutput",
  initialState: {
    codeOutput: "",
  },
  reducers: {
    setCodeOutput: (state, action) => {
      state.codeOutput = action.payload;
    },
  },
});

export const { setCodeOutput } = codeOutputSlice.actions;

export default codeOutputSlice.reducer;
