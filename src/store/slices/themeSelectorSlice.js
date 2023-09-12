import { createSlice } from "@reduxjs/toolkit";

const themeSelectorSlice = createSlice({
  name: "themeSelector",
  initialState: {
    selectedTheme: localStorage.getItem("themeSelector") || "monokai", //dark
  },
  reducers: {
    setSelectedThemes: (state, action) => {
      state.selectedTheme = action.payload;
      localStorage.setItem("themeSelector", action.payload);
    },
  },
});

export const { setSelectedThemes } = themeSelectorSlice.actions;

export default themeSelectorSlice.reducer;
