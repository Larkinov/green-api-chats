import React from "react";
import styles from "./boxChat.module.scss";
import Message from "../../MessageItem";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { TMessage } from "../../../redux/slices/messageSlice";

const BoxChat: React.FC = () => {

  const { messageItems, idActiveContact, lengthActiveMessages } = useSelector(
    (state: RootState) => state.messages
  );

  React.useEffect(() => {
    console.log(idActiveContact,"activeContact");
    
  },[lengthActiveMessages,idActiveContact]);

  console.log(messageItems,"messagesss");
  console.log(idActiveContact, "idActiveContact");
  
  

  return (
    <div className={styles.boxChat}>
      { idActiveContact &&
         messageItems[idActiveContact-1].messages.map(
            (item: TMessage, index: number) => (
              <Message key={index} text={item.text} />
            )
          )
        }
    </div>
  );
};

export default BoxChat;
