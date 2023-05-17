import React from "react";
import styles from "./inputs.module.scss";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  StreamMessageEnum,
  TMessage,
  setLastMessageId,
  setMessage,
} from "../../../../redux/slices/messageSlice";
import {
  deleteNotification,
  getChatHistory,
  getNotification,
  sendTextMessage,
} from "../../../../requestFunction";
import axios from "axios";

const InputChat: React.FC = () => {
  const dispatch = useDispatch();
  const [inputButtonSend, setInputButtonSend] = React.useState("");
  const { activePhoneNumber,messageItems, idActiveContact } = useSelector(
    (state: RootState) => state.messages
  );
  const { idInstance, apiTokenInstance } = useSelector(
    (state: RootState) => state.profile
  );

  const sendTextMessage = async (
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
    await axios
      .post(
        `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiToken}`,
        payload,
        config
      )
      .then(() => {
        let m: TMessage = {
          streamMessage: StreamMessageEnum.OUTPUT,
          text: inputButtonSend,
          idMessage: "1",
        };
        setInputButtonSend("");        
        dispatch(setMessage(m));
        // console.log(messageItems[idActiveContact-1].messages[messageItems[idActiveContact-1].messages.length-1],"Ssssssssssssssss");
        
      })
      .catch((err) => {
        console.log("error_sendMessage", err);
      });

    setTimeout(() => {
      axios
        .post(
          `https://api.green-api.com/waInstance${idInstance}/GetChatHistory/${apiToken}`,
          payload,
          config
        )
        .then((res) => {
          console.log(res.data);
          console.log(messageItems[idActiveContact-1].messages);
          
          dispatch(setLastMessageId(res.data[0].idMessage));

          // setTimeout(() => {
          //   console.log(res.data[0].textMessage,"получаю последнее сообщение!");
          // console.log(res.data[0].idMessage,"получаю последнее сообщение!");
          // console.log(messageItems[idActiveContact-1].messages[messageItems[idActiveContact-1].messages.length-1].idMessage,"айдишка в редаксе");
          // }, 1000);
          
          
          
          return res.data;
        })
        .catch((err) => {
          console.log("error_GetLastMessage", err);
          return null;
        });
    }, 3000);

  };

  const onClickButtonSend = () => {
    sendTextMessage(
      idInstance,
      apiTokenInstance,
      activePhoneNumber,
      inputButtonSend
    );
  };

  return (
    <div className={styles.inputBlock}>
      <input
        type="text"
        placeholder="Текст сообщения..."
        className={styles.inputChat}
        value={inputButtonSend}
        onChange={(event) => setInputButtonSend(event.target.value)}
      />
      <img
        src="./svg/send.svg"
        alt="send"
        className={styles.inputChatIcon}
        onClick={() => onClickButtonSend()}
      />
    </div>
  );
};

export default InputChat;
