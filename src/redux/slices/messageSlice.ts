import { createSlice } from "@reduxjs/toolkit";

export interface IMessageSlice {
    chatId: string;
    message: string;
}

const initialState : IMessageSlice = {
    chatId: "",
    message: "",
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessageOptions(state, action) {      

        },
  },
});

export const {
    setMessageOptions
} = messageSlice.actions;

export default messageSlice.reducer;
