import React from "react";
import styles from "./message.module.scss";
import classNames from "classnames";

type MessageProps = {
  text: string;
};

const Message: React.FC<MessageProps> = ({text}) => {
  return (
    <p className={classNames(styles.message, styles.outMessage)}>{text}</p>
  );
};

export default Message;
