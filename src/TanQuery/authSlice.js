// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVerified: false,
  pinInput: "",
  showPinPrompt: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsVerified: (state, action) => {
      state.isVerified = action.payload;
    },
    setPinInput: (state, action) => {
      state.pinInput = action.payload;
    },
    setShowPinPrompt: (state, action) => {
      state.showPinPrompt = action.payload;
    },
    resetAuthState: () => initialState, // optional helper
  },
});

export const { setIsVerified, setPinInput, setShowPinPrompt, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
