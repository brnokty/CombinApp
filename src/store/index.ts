import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import combinationReducer from './slices/combinationSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    combinations: combinationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
