import {PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum StreamMessageEnum {
  INPUT = "input",
  OUTPUT = "output",
}

export type TMessage = {
    streamMessage: StreamMessageEnum,
    text: string;
};

export type TMessagesContact = {
    idContact:number;
    messages:TMessage[]
}

const nullMessage:TMessage[] = [{
    streamMessage: StreamMessageEnum.OUTPUT,
    text:"У вас нет сообщений с *contactName*. Напишите сообщение чтобы начать беседу.",
}]

interface IMessageSlice {
  idActiveContact: number;
  activePhoneNumber: string;
  lengthActiveMessages : number;
  messageItems:  TMessagesContact[];
}

const nullMessageItems:TMessagesContact[] = [{
    idContact:0,
    messages:nullMessage,
}]

export const nullMessageItem:TMessagesContact = {
  idContact:0,
  messages:nullMessage,
}

const initialState: IMessageSlice = {
  idActiveContact: 0,
  activePhoneNumber: "",
  lengthActiveMessages: 0,
  messageItems:  nullMessageItems,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setActiveContact(state, action) {
      state.idActiveContact = action.payload.idActiveContact;
      state.activePhoneNumber = action.payload.activePhoneNumber;
      
    },
    addFirstMessage(state,action){
        state.messageItems.push(action.payload);
    },
    setMessage(state, action) {
      state.messageItems[state.idActiveContact-1].messages.push(action.payload);
      state.lengthActiveMessages++;
    },
  },
});

export const { setActiveContact, setMessage, addFirstMessage } = messageSlice.actions;

export default messageSlice.reducer;
