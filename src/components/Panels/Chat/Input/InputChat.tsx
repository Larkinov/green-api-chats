import React from "react";
import styles from "./inputs.module.scss";
import { RootState, useAppDispatch } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sendMessageRedux } from "../../../../redux/slices/messageSlice";

const InputChat: React.FC = () => {
  const dispatch = useDispatch();
  const dispatchApp = useAppDispatch();
  const [inputButtonSend, setInputButtonSend] = React.useState("");
  const { activePhoneNumber} = useSelector(
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
    // const payload = {
    //   chatId: idChat + "@c.us",
    //   message: textMessage,
    // };

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    dispatchApp(
      sendMessageRedux({
        idInstance: idInstance,
        apiToken: apiToken,
        idChat: idChat,
        textMessage: textMessage,
      })
    );
  };

  const onClickButtonSend = () => {
    sendTextMessage(
      idInstance,
      apiTokenInstance,
      activePhoneNumber,
      inputButtonSend
    );
    setInputButtonSend("");
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
