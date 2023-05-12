import React from "react";
import styles from "./inputs.module.scss";

const InputChat: React.FC = () => {
  return (
    <div className={styles.inputBlock}>
      <input
        type="text"
        placeholder="Текст сообщения..."
        className={styles.inputChat}
      />
      <img src="./svg/send.svg" alt="send" className={styles.inputChatIcon}/>
    </div>
  );
};

export default InputChat;
