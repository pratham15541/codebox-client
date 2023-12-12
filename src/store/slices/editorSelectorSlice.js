import { createSlice } from "@reduxjs/toolkit";

const editorSelectorSlice = createSlice({
  name: "editorSelector",
  initialState: {
    editorSelected: localStorage.getItem("editorSelector") || "ace",
  },
  reducers: {
    setSelectedEditor: (state, action) => {
      state.editorSelected = action.payload;
      localStorage.setItem("editorSelector", action.payload);
    },
  },
});

export const { setSelectedEditor } = editorSelectorSlice.actions;

export default editorSelectorSlice.reducer;
