import React from "react";
import styles from "./boxChat.module.scss";
import Message from "../../MessageItem";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import {
  TMessage,
  getChatHistoryArgs,
  getChatHistoryRedux,
} from "../../../redux/slices/messageSlice";



const BoxChat: React.FC = () => {
  const dispatchApp = useAppDispatch();
  const { messageItems, idActiveContact, lengthActiveMessages } = useSelector(
    (state: RootState) => state.messages
  );

  const isFirst = React.useRef(true);
  const { idInstance, apiTokenInstance } = useSelector(
    (state: RootState) => state.profile
  );
  const { activePhoneNumber } = useSelector(
    (state: RootState) => state.messages
  );

  let args: getChatHistoryArgs = {
    idInstance: idInstance,
    apiToken: apiTokenInstance,
    idChat: activePhoneNumber,
  };

  const ticktimer = React.useCallback(() => {
    setInterval(()=>{
      console.log(args,"приходящие опции!");
      
      dispatchApp(getChatHistoryRedux(args));
    },5000)
  }, []);

  React.useEffect(() => {
    if (
      isFirst.current ||
      messageItems[idActiveContact - 1].messages.length === 1
    ) {
      ticktimer();
    }
    isFirst.current = false;
  }, [lengthActiveMessages, idActiveContact]);

  return (
    <div className={styles.boxChat}>
      {idActiveContact &&
        messageItems[idActiveContact - 1].messages.map(
          (item: TMessage, index: number) => (
            <Message
              key={index}
              text={item.text}
              streamMessage={item.streamMessage}
            />
          )
        )}
    </div>
  );
};

export default BoxChat;
