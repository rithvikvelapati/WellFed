import { configureStore } from '@reduxjs/toolkit';
import { modalReducer } from './modalSlice';
import filterReducer from './filterSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    filter: filterReducer,
    friends: friendsReducer,
    // Add other reducers here if needed
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
