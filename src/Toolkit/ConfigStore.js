import { configureStore } from "@reduxjs/toolkit";
import  counterReducer from './countSLice'

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});
export default store;