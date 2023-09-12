import { createSlice } from "@reduxjs/toolkit";

const langSelectorSlice = createSlice({
  name: "langSelector",
  initialState: {
    langSelected: localStorage.getItem("langSelector") || "javascript",
  },
  reducers: {
    setSelectedLanguage: (state, action) => {
      state.langSelected = action.payload;
      localStorage.setItem("langSelector", action.payload);
    },
  },
});

export const { setSelectedLanguage } = langSelectorSlice.actions;

export default langSelectorSlice.reducer;
