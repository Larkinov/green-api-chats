import { configureStore } from '@reduxjs/toolkit'
import profileSlice from './slices/profileSlice';
import uiControllerSlice from './slices/uiControllerSlice';
import messageSlice from './slices/messageSlice';
import contactSlice from './slices/contactSlice';

export const store = configureStore({
  reducer: {
    profile:profileSlice,
    uiController:uiControllerSlice,
    messages: messageSlice,
    contacts:contactSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;