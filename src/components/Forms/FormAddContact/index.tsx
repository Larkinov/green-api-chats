import React from "react";
import styles from "./formAddContact.module.scss";
import { useDispatch } from "react-redux";
import { setFormAddContact } from "../../../redux/slices/uiControllerSlice";

const INPUT_CONTACT_REGEXP = /^[0-9]{11}$/

function FormAddContact() {
const dispatch = useDispatch();
  const [inputButtonSend, setInputButtonSend] = React.useState("");
  const failedSendContact = React.useRef(false);

  const btnSendContact = () => {    
    if(inputButtonSend.replaceAll(" ","").match(INPUT_CONTACT_REGEXP)){
        failedSendContact.current = false;
        dispatch(setFormAddContact(false));
    }else{
        failedSendContact.current = true;
    }
    setInputButtonSend("");
  };

  return (
    <div className={styles.windowAddContact}>
      <h3>Добавить новый контакт</h3>
      <p>Номер телефона в формате "7 ххх ххх хх хх"</p>
      <div className={styles.inputBlock}>
        {failedSendContact.current && <p className={styles.failedSendContact}>Неверный формат</p>}
        <input
          type="text"
          placeholder="Введите номер..."
          className={styles.inputContact}
          value={inputButtonSend}
          onChange={(event) => setInputButtonSend(event.target.value)}
        />
        <img
          src="./svg/send.svg"
          alt="send"
          className={styles.inputIcon}
          onClick={() => btnSendContact()}
        />
      </div>
    </div>
  );
}

export default FormAddContact;
