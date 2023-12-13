import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import themeSelectorReducer from "./slices/themeSelectorSlice";
import languageSelectorReducer from "./slices/languageSelectorSlice";
import editorSelectorReducer from "./slices/editorSelectorSlice";
import codeSliceReducer from "./slices/codeSlice";
import codeInputReducer from "./slices/codeInputSlice";
import codeOutputReducer from "./slices/codeOutputSlice";
import webContainerReducer from './slices/webcontainerSlice';
import muiDataReducer from './slices/muiDataSlice'
import codeCommandReducer from './slices/codeCommandSlice'

const store = configureStore({
  reducer: {
    theme: themeReducer,
    themeSelector: themeSelectorReducer,
    languageSelector: languageSelectorReducer,
    editorSelector: editorSelectorReducer,
    code: codeSliceReducer,
    codeInput: codeInputReducer,
    codeOutput: codeOutputReducer,
    codeCommand: codeCommandReducer,
    webContainerInstance: webContainerReducer,
    muiData: muiDataReducer,
  },
});

export default store;
