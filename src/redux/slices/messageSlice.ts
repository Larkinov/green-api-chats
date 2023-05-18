import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export enum StreamMessageEnum {
  INPUT = "input",
  OUTPUT = "output",
}

export enum StatusCaseEnum {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type TMessage = {
  streamMessage: StreamMessageEnum;
  text: string;
  idMessage: string;
};

export type TMessagesContact = {
  idContact: number;
  messages: TMessage[];
};

const nullMessage: TMessage[] = [
  {
    streamMessage: StreamMessageEnum.OUTPUT,
    text: "У вас нет сообщений с *contactName*. Напишите сообщение чтобы начать беседу.",
    idMessage: "00000000",
  },
];

interface IMessageSlice {
  idActiveContact: number;
  activePhoneNumber: string;
  lengthActiveMessages: number;
  messageItems: TMessagesContact[];
  statusSendMessage: StatusCaseEnum;
  statusGetChatHistory: StatusCaseEnum;
}

const nullMessageItems: TMessagesContact[] = [
  {
    idContact: 0,
    messages: nullMessage,
  },
];

export const nullMessageItem: TMessagesContact = {
  idContact: 0,
  messages: nullMessage,
};

export type sendMessageReduxArgs = {
  idInstance: string;
  apiToken: string;
  idChat: string;
  textMessage: string;
};

export const sendMessageRedux = createAsyncThunk(
  "messages/sendMessage",
  async (messageItem: sendMessageReduxArgs) => {
    const idInstance: string = messageItem.idInstance;
    const apiToken: string = messageItem.apiToken;
    const idChat: string = messageItem.idChat;
    const textMessage: string = messageItem.textMessage;

    const payload = {
      chatId: idChat + "@c.us",
      message: textMessage,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiToken}`,
      payload,
      config
    );

    const returnResponse = {
      idMessage: response.data.idMessage,
      textMessage,
    };

    return returnResponse;
  }
);

export type getChatHistoryArgs = {
  idInstance: string;
  apiToken: string;
  idChat: string;
};

export const getChatHistoryRedux = createAsyncThunk(
  "messages/getChatHistory",
  async (messagesOptions: getChatHistoryArgs) => {
    console.log("Отправка запроса получения чата");
    
    

    const payload = {
      chatId: messagesOptions.idChat + "@c.us",
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `https://api.green-api.com/waInstance${messagesOptions.idInstance}/GetChatHistory/${messagesOptions.apiToken}`,
        payload,
        config
      );
      return response.data;
    } catch (error) {
      console.log("error_GetChatHistory", error);
    }
  }
);

const initialState: IMessageSlice = {
  idActiveContact: 0,
  activePhoneNumber: "",
  lengthActiveMessages: 0,
  messageItems: nullMessageItems,
  statusSendMessage: StatusCaseEnum.LOADING,
  statusGetChatHistory: StatusCaseEnum.LOADING,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setActiveContact(state, action) {
      state.idActiveContact = action.payload.idActiveContact;
      state.activePhoneNumber = action.payload.activePhoneNumber;
    },
    addFirstMessage(state, action) {
      state.messageItems.push(action.payload);
    },
    setMessage(state, action) {
      state.messageItems[state.idActiveContact - 1].messages.push(
        action.payload
      );
      state.lengthActiveMessages++;
    },
    setLastMessageId(state, action) {
      state.messageItems[state.idActiveContact - 1].messages[
        state.messageItems[state.idActiveContact - 1].messages.length - 1
      ].idMessage = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(sendMessageRedux.pending, (state) => {
      state.statusSendMessage = StatusCaseEnum.LOADING;
    });
    builder.addCase(sendMessageRedux.fulfilled, (state, action) => {
      let messagePush: TMessage = {
        streamMessage: StreamMessageEnum.OUTPUT,
        text: action.payload.textMessage,
        idMessage: action.payload.idMessage,
      };
      state.statusSendMessage = StatusCaseEnum.SUCCESS;

      state.messageItems[state.idActiveContact - 1].messages.push(messagePush);
    });
    builder.addCase(sendMessageRedux.rejected, (state) => {
      console.log("errormess!");
      state.statusSendMessage = StatusCaseEnum.ERROR;
    });

    builder.addCase(getChatHistoryRedux.pending, (state, action) => {
      state.statusGetChatHistory = StatusCaseEnum.LOADING;
    });
    builder.addCase(getChatHistoryRedux.fulfilled, (state, action) => {
      state.statusGetChatHistory = StatusCaseEnum.SUCCESS;

      let pushMessage: TMessage[] = [];
      let messagesThisContact =
        state.messageItems[state.idActiveContact - 1].messages;
      let messagesApi = action.payload;
      console.log(messagesApi,"Сообщения из api!");
      
      for (let i = messagesApi.length - 1; i >= 0; i--) {
        if (messagesApi[i].textMessage !== undefined) {
          let elemMessage: TMessage = {
            streamMessage: StreamMessageEnum.OUTPUT,
            text: messagesApi[i].textMessage,
            idMessage: messagesApi[i].idMessage,
          };
          let isNotClone: boolean = false;
          if (messagesApi[i].type === "incoming") {
            elemMessage.streamMessage = StreamMessageEnum.INPUT;
          }
          for (let j = 0; j < messagesThisContact.length; j++) {
            if (messagesThisContact[j].idMessage !== messagesApi[i].idMessage) {
              isNotClone = true;
            } else {
              isNotClone = false;
              break;
            }
          }
          if (isNotClone) {
            pushMessage.push(elemMessage);
          }
        }
      }

      pushMessage.forEach((value) => {
        messagesThisContact.push(value);
        state.lengthActiveMessages++;
      });
    });
    builder.addCase(getChatHistoryRedux.rejected, (state) => {
      state.statusGetChatHistory = StatusCaseEnum.ERROR;
    });
  },
});

export const {
  setActiveContact,
  setMessage,
  addFirstMessage,
  setLastMessageId,
} = messageSlice.actions;

export default messageSlice.reducer;
