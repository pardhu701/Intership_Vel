import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UseSlice';
import authReducer from "./authSlice";

export const store1 = configureStore({
  reducer: {
    user: userReducer,
    auth:authReducer,
  },
});
