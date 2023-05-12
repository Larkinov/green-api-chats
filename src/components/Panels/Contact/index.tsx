import React from "react";
import styles from "./panelContacts.module.scss";
import Header from "../../Header/Contact";
import BoxContacts from "../../Box/Contact";

const PanelContacts: React.FC = () => {
  return (
    <div className={styles.panelContact}>
        <Header/>
        <BoxContacts/>
    </div>
  );
}

export default PanelContacts;
