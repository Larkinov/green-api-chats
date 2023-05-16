import React from "react";
import styles from "./contact.module.scss";
import { addFirstMessage, nullMessageItem, setActiveContact, } from "../../redux/slices/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { setPanelChat } from "../../redux/slices/uiControllerSlice";
import { RootState } from "../../redux/store";

type ContactProps = {
  idContact: number;
  phoneNumber: string;
};

const Contact: React.FC<ContactProps> = ({ idContact, phoneNumber }) => {
  const dispatch = useDispatch();
  const {messageItems} = useSelector((state:RootState) => state.messages);

  const onClickContact = () => {
    if(messageItems[idContact-1]===undefined){
      dispatch(addFirstMessage(nullMessageItem));
    }
    dispatch(setActiveContact({idActiveContact:idContact, activePhoneNumber:phoneNumber}));
    dispatch(setPanelChat(true));
    console.log("ClickContact",idContact);
  };

  return (
    <div className={styles.contact} onClick={() => onClickContact()}>
      {phoneNumber}
    </div>
  );
};

export default Contact;
