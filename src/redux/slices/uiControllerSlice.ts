import { createSlice } from "@reduxjs/toolkit";

export interface IUIControllerSlice {
  formRegistration : boolean,
  formAddContact : boolean,
}

const initialState : IUIControllerSlice = {
    formRegistration: true,
    formAddContact: false,
};

const uiControllerSlice = createSlice({
  name: "uiController",
  initialState,
  reducers: {
    setFormRegistration(state, action) {      
      state.formRegistration = action.payload;
    },
    setFormAddContact(state, action) {  
      state.formAddContact = action.payload;
    },
  },
});

export const {
    setFormRegistration,
    setFormAddContact,
} = uiControllerSlice.actions;

export default uiControllerSlice.reducer;
