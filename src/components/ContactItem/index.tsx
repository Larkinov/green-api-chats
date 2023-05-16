import React from "react";
import styles from "./contact.module.scss";
import { setActiveContact } from "../../redux/slices/messageSlice";
import { useDispatch } from "react-redux";
import { setPanelChat } from "../../redux/slices/uiControllerSlice";

type ContactProps = {
  idContact: number;
  phoneNumber: string;
};

const Contact: React.FC<ContactProps> = ({ idContact, phoneNumber }) => {
  const dispatch = useDispatch();

  const onClickContact = (id: number) => {
    dispatch(setActiveContact({idActiveContact:idContact, activePhoneNumber:phoneNumber}));
    dispatch(setPanelChat(true));
    console.log("ClickContact",id);
  };

  return (
    <div className={styles.contact} onClick={() => onClickContact(idContact)}>
      {phoneNumber}
    </div>
  );
};

export default Contact;
