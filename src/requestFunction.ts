import axios from "axios";

export const sendMessage = (idChat: string, message: string) => {
  const idInstance = "1101820189";
  const apiTokenInstance = "9b0bee469f9a4905b7a18b64914ca7251ea94c35c7a349e9a0";

  const payload = {
    chatId: "79001234567@c.us",
    message: "I use Green-API to send this message to you!",
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .post(
      `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      payload,
      config
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log("error_sendMessage", err);
    });
};
