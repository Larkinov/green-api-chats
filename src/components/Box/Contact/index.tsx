import React from 'react'
import style from "./boxContacts.module.scss";
import Contact from '../../ContactItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { TContact } from '../../../redux/slices/contactSlice';

const BoxContacts:React.FC = () => {

  const {contactItems} = useSelector((state:RootState)=> (state.contacts))

  return (
    <div className={style.boxContacts}>
        {contactItems.map((item:TContact) => (
          <Contact key={item.id} idContact={item.id+1} phoneNumber={item.phoneNumber}></Contact>
        ))}
      </div>
  )
}

export default BoxContacts