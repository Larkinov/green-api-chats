import React from "react";
import styles from "./message.module.scss";
import classNames from "classnames";
import { StreamMessageEnum } from "../../redux/slices/messageSlice";

type MessageProps = {
  text: string;
  streamMessage : StreamMessageEnum;
};

const Message: React.FC<MessageProps> = ({text, streamMessage}) => {

  return (
    <p className={streamMessage === "output" ? classNames(styles.message, styles.outMessage) :classNames(styles.message, styles.inMessage) }>{text}</p>
  );
};

export default Message;
