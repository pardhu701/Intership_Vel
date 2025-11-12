import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {}, 
 
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
     logout: (state) => {
      return initialState; // reset slice
    },
  },
});

export const { setUserC, updateUserC, clearUserC ,logout} = userSlice.actions;

export default userSlice.reducer;
