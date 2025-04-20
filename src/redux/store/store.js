import { configureStore } from '@reduxjs/toolkit'
import movieoReducer from '../Slice/movieoSlice'
import authReducer from '../Slice/authSlice';

export const store = configureStore({
  reducer: {
    movieoData : movieoReducer,
    auth: authReducer,
  },
})