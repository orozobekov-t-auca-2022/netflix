import { configureStore } from '@reduxjs/toolkit';
import authSlice from './userSlice';
import moviesSlice from './moviesSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    movies: moviesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
