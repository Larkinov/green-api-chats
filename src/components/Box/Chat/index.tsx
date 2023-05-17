import React from "react";
import styles from "./boxChat.module.scss";
import Message from "../../MessageItem";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { StreamMessageEnum, TMessage, setMessage } from "../../../redux/slices/messageSlice";
import axios from "axios";

const BoxChat: React.FC = () => {
  const { messageItems, idActiveContact, lengthActiveMessages } = useSelector(
    (state: RootState) => state.messages
  );

  const isFirst = React.useRef(true);

  const dispatch = useDispatch();
  const { idInstance, apiTokenInstance } = useSelector(
    (state: RootState) => state.profile
  );
  const { activePhoneNumber } = useSelector(
    (state: RootState) => state.messages
  );

  const getChatHistory = async (
    idInstance: string,
    apiToken: string,
    idChat: string
  ) => {
    const payload = {
      chatId: idChat + "@c.us",
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .post(
        `https://api.green-api.com/waInstance${idInstance}/GetChatHistory/${apiToken}`,
        payload,
        config
      )
      .then((res) => {
        for (let i = res.data.length - 1; i >= 0; i--) {
          if (res.data[i].textMessage !== undefined) {
            // let m: TMessage = {streamMessage: StreamMessageEnum.OUTPUT ,text: res.data[i].textMessage };
            // if(res.data[i].type==="incoming"){
            //   m.streamMessage = StreamMessageEnum.INPUT;
            // }
            // dispatch(setMessage(m));
          }
        }
        return res.data;
      })
      .catch((err) => {
        console.log("error_GetChatHistory", err);
        return null;
      });
  };

  React.useEffect(() => {
    if(isFirst.current||messageItems[idActiveContact-1].messages.length===1){
      getChatHistory(idInstance, apiTokenInstance, activePhoneNumber);
    }
    isFirst.current = false;
  }, [lengthActiveMessages, idActiveContact]);

  return (
    <div className={styles.boxChat}>
      {idActiveContact &&
        messageItems[idActiveContact - 1].messages.map(
          (item: TMessage, index: number) => (
            <Message key={index} text={item.text} streamMessage={item.streamMessage} />
          )
        )}
    </div>
  );
};

export default BoxChat;
