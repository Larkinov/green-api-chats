import { createSlice } from "@reduxjs/toolkit";

export type TContact = {
    id: number,
    phoneNumber: string,
}

interface IContactsSlice {
    contactItems : TContact[],
    length : number,
}

const initialState : IContactsSlice = {
    contactItems: [],
    length: 0,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContact (state, action){
        state.contactItems.push(action.payload);
        state.length = state.contactItems.length;
    }
  },
});

export const {
    setContact
} = contactsSlice.actions;

export default contactsSlice.reducer;
