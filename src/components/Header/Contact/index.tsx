import React from "react";
import styles from "./headerContact.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { setFormAddContact } from "../../../redux/slices/uiControllerSlice";
import { RootState } from "../../../redux/store";
import axios from "axios";
import {
  StreamMessageEnum,
  TMessage,
  setMessage,
} from "../../../redux/slices/messageSlice";

const HeaderContact: React.FC = () => {
  const { idInstance, apiTokenInstance } = useSelector(
    (state: RootState) => state.profile
  );
  const { messageItems, idActiveContact } = useSelector(
    (state: RootState) => state.messages
  );
  const dispatch = useDispatch();

  const onClickAddContact = () => {
    dispatch(setFormAddContact(true));
  };

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
        let pushMessage: TMessage[] = [];
        console.log(res.data);
        console.log(messageItems[idActiveContact - 1].messages);

        for (let i = res.data.length - 1; i >= 0; i--) {
          if (res.data[i].textMessage !== undefined) {
            let x: TMessage = {
              streamMessage: StreamMessageEnum.OUTPUT,
              text: res.data[i].textMessage,
              idMessage: res.data[i].idMessage,
            };
            let f: boolean = false;
            if (res.data[i].type === "incoming") {
              x.streamMessage = StreamMessageEnum.INPUT;
            }
            for (
              let j = 0;
              j < messageItems[idActiveContact - 1].messages.length;
              j++
            ) {
              if (
                messageItems[idActiveContact - 1].messages[j].idMessage !==
                res.data[i].idMessage
              ) {
                f = true;
                console.log(
                  messageItems[idActiveContact - 1].messages[j].idMessage,
                  res.data[i].idMessage,
                  "--------------"
                );

                console.log(x, "element", i, j);
              } else {
                f = false;
                break;
              }
            }
            if (f) {
              pushMessage.push(x);
            }

            // if (res.data[i].textMessage !== undefined) {
            //   let x: TMessage = {
            //     streamMessage: StreamMessageEnum.OUTPUT,
            //     text: res.data[i].textMessage,
            //     idMessage: res.data[i].idMessage,
            //   };
            //   if (res.data[i].type === "incoming") {
            //     x.streamMessage = StreamMessageEnum.INPUT;
            //   }
            //   messageItems.filter((item) => {
            //     res.data.find
            //   });
          }
        }
        pushMessage.forEach((value) => {
          console.log(value, "ssssssssssss");

          dispatch(setMessage(value));
        });
        return res.data;
      })
      .catch((err) => {
        console.log("error_GetChatHistory", err);
        return null;
      });
  };

  return (
    <div className={styles.header}>
      <h3>Contacts</h3>
      <button className={styles.btnAddContact}>
        <img src="./svg/plus.svg" alt="" onClick={() => onClickAddContact()} />
      </button>

      <button className={styles.btnAddContact}>
        <img
          src="./svg/plus.svg"
          alt=""
          onClick={() =>
            getChatHistory(idInstance, apiTokenInstance, activePhoneNumber)
          }
        />
      </button>
    </div>
  );
};

export default HeaderContact;
