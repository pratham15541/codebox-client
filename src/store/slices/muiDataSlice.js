import { createSlice } from "@reduxjs/toolkit";

const muiDataSlice = createSlice({
  name: "muiData",
  initialState: {
    muiData: "",
  },
  reducers: {
    setMuiData: (state, action) => {
      state.muiData = action.payload;
    },
  },
});

export const { setMuiData } = muiDataSlice.actions;

export default muiDataSlice.reducer;
