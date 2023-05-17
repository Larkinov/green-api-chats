import axios from "axios";

export const sendTextMessage = (
  idInstance: string,
  apiToken: string,
  idChat: string,
  textMessage: string
) => {
  const payload = {
    chatId: idChat + "@c.us",
    message: textMessage,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .post(
      `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiToken}`,
      payload,
      config
    )
    .catch((err) => {
      console.log("error_sendMessage", err);
    });
};

export const getNotification = (idInstance: string, apiToken: string) => {
  axios
    .get(
      `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiToken}`
    )
    .then((res) => {
      console.log(res.data.receiptId, "id чтобы удалить");

      console.log(res.data.body);

      //номер
      // console.log(res.data.body.senderData.chatId);
    })
    .catch((err) => {
      // console.log("error_getNotification", err);
    });
};

export const deleteNotification = (
  idInstance: string,
  apiToken: string,
  idNotification: string
) => {
  axios
    .delete(
      `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiToken}/${idNotification}`
    )
    .then((res) => {
      console.log(res.data, "datas");
    })
    .catch((err) => {
      console.log("error_deleteNotification", err);
    });
};

export const getChatHistory = (
  idInstance: string,
  apiToken: string,
  idChat: string,
) => {
  const payload = {
    chatId: idChat + "@c.us",
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .post(
      `https://api.green-api.com/waInstance${idInstance}/GetChatHistory/${apiToken}`,
      payload,
      config
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("error_GetChatHistory", err);
      return null;
    });
};
