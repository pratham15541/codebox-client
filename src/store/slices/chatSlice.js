import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    sessionId: null,
    messages: [],
    loading: false,
  },
  reducers: {
    openChat: (state) => {
      state.isOpen = true;
      state.isMinimized = false;
    },
    closeChat: (state) => {
      state.isOpen = false;
      state.isMinimized = false;
      state.isMaximized = false;
    },
    minimizeChat: (state) => {
      state.isMinimized = true;
      state.isMaximized = false;
    },
    maximizeChat: (state) => {
      state.isMaximized = true;
      state.isMinimized = false;
    },
    restoreChat: (state) => {
      state.isMaximized = false;
      state.isMinimized = false;
    },
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
      state.sessionId = null;
    },
    setChatLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  openChat,
  closeChat,
  minimizeChat,
  maximizeChat,
  restoreChat,
  setSessionId,
  addMessage,
  setMessages,
  clearMessages,
  setChatLoading,
} = chatSlice.actions;

export default chatSlice.reducer;
