import React from 'react'
import styles from "./headerContact.module.scss";

import { useDispatch } from 'react-redux';
import { setFormAddContact } from '../../../redux/slices/uiControllerSlice';

const HeaderContact:React.FC = () => {

  const dispatch = useDispatch();

  const onClickAddContact = () => {   
    console.log("click_add!");
     
    dispatch(setFormAddContact(true));
  }
  

  return (
    <div className={styles.header}>
      <h3>Contacts</h3>
      <button className={styles.btnAddContact}>
        <img src="./svg/plus.svg" alt="" onClick={() => onClickAddContact()}/>
      </button>
    </div>
    )
}

export default HeaderContact