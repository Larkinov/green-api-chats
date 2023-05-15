import { configureStore } from '@reduxjs/toolkit'
import profileSlice from './slices/profileSlice';
import uiControllerSlice from './slices/uiControllerSlice';

export const store = configureStore({
  reducer: {
    profile:profileSlice,
    uiController:uiControllerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;