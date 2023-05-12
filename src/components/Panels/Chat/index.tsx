import React from 'react'
import styles from "./panelChat.module.scss";
import Header from '../../Header/Chat';
import BoxChat from '../../Box/Chat';
import Input from '../../Input/InputChat';

const PanelChat:React.FC = () => {
  return (
    <div className={styles.panelChat}>
        <Header/>
        <BoxChat/>
        <Input/>
      </div>
  )
}

export default PanelChat