import { createSlice } from "@reduxjs/toolkit";

interface IUIControllerSlice {
  formRegistration: boolean;
  formAddContact: boolean;
  panelChat: boolean;
}

const initialState: IUIControllerSlice = {
  formRegistration: true,
  formAddContact: false,
  panelChat: false,
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
    setPanelChat(state, action) {
      state.panelChat = action.payload;
    },
  },
});

export const { setFormRegistration, setFormAddContact, setPanelChat } =
  uiControllerSlice.actions;

export default uiControllerSlice.reducer;
