import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import combinationReducer from './slices/combinationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    combination: combinationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
