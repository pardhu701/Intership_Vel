import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UseSlice';

export const store1 = configureStore({
  reducer: {
    user: userReducer,
  },
});
