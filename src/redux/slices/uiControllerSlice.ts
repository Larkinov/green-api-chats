import { createSlice } from "@reduxjs/toolkit";

export interface IUIControllerSlice {
  formRegistration : boolean,
}

const initialState : IUIControllerSlice = {
    formRegistration: true,
};

const uiControllerSlice = createSlice({
  name: "uiController",
  initialState,
  reducers: {
    setFormRegistration(state, action) {      
      state.formRegistration = action.payload.formRegistration;
    },
  },
});

export const {
    setFormRegistration,
} = uiControllerSlice.actions;

export default uiControllerSlice.reducer;
