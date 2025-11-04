import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: "Customer",  // user will be an object like { id, name, email }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserC: (state, action) => {
      state.user = action.payload;
    },
    updateUserC: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    clearUserC: (state) => {
      state.user = null;
    },
  },
});

export const { setUserC, updateUserC, clearUserC } = userSlice.actions;

export default userSlice.reducer;
