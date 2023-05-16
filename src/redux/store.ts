import { configureStore } from '@reduxjs/toolkit'
import profileSlice from './slices/profileSlice';
import uiControllerSlice from './slices/uiControllerSlice';
import messageSlice from './slices/messageSlice';

export const store = configureStore({
  reducer: {
    profile:profileSlice,
    uiController:uiControllerSlice,
    message: messageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;