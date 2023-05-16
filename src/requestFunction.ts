import axios from "axios";

export const sendTextMessage = (
  idInstance: string,
  apiToken: string,
  idChat: string,
  textMessage: string
) => {
  const payload = {
    chatId: idChat+"@c.us",
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
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log("error_sendMessage", err);
    });

    console.log(payload);
    
};
