import React from "react";
import styles from "./inputs.module.scss";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { StreamMessageEnum, TMessage, setMessage } from "../../../../redux/slices/messageSlice";
import { deleteNotification, getChatHistory, getNotification, sendTextMessage } from "../../../../requestFunction";

const InputChat: React.FC = () => {
  const dispatch = useDispatch();
  const [inputButtonSend, setInputButtonSend] = React.useState("");
  const {activePhoneNumber} = useSelector((state: RootState) => state.messages);
  const {idInstance, apiTokenInstance} = useSelector((state:RootState)=> state.profile);

  const onClickButtonSend = () => {
      let m:TMessage = { streamMessage: StreamMessageEnum.OUTPUT,text:inputButtonSend};
      dispatch(setMessage(m));
      
      sendTextMessage(idInstance,apiTokenInstance,activePhoneNumber,m.text);
      setInputButtonSend("");

      // getNotification(idInstance,apiTokenInstance);
      // for (let index = 8; index < 20; index++) {
      //   deleteNotification(idInstance,apiTokenInstance,String(index));
      //   console.log(index,"index");
      // }
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
