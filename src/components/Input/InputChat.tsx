import React from "react";
import styles from "./inputs.module.scss";



const InputChat: React.FC = () => {
  const [inputButtonSend, setInputButtonSend] = React.useState("");

  const onClickButtonSend = () => {
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
