import React from "react";
import styles from "./registration.module.scss";
import greenApi from "../../green-api-postman-collection-master/ru/environment.json";
import axios from "axios";

// console.log(greenApi);

const Registration: React.FC = () => {
  const [idInstance, setIdInstance] = React.useState("");
  const [apiToken, setApiToken] = React.useState("");

  const postProfileData = () => {

    const config = {
        headers: {
            header1:'Access-Control-Allow-Origin',
        },
    }
    console.log(greenApi.values);   
    // greenApi.values[1].value=idInstance;
    // greenApi.values[2].value=apiToken;
    greenApi.values[1].value="1101820189";
    greenApi.values[2].value="9b0bee469f9a4905b7a18b64914ca7251ea94c35c7a349e9a0";
    axios.get(`https://api.green-api.com/waInstance${idInstance}/GetSettings/${apiToken}`, config).then((res)=> {
        console.log(res,"res");  
    }).catch(err => {
       console.log("error", err);
    });
}

  const onClickSubmit = () => {
    postProfileData();
    setApiToken(""); 
    setIdInstance(""); 
};


  return (
    <div className={styles.windowRegistation}>
      <h1>Зарегистрироваться</h1>
      <input
        type="text"
        className={styles.inputInstance}
        placeholder="idInstance"
        value={idInstance}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setIdInstance(event.target.value)
        }
      />
      <input
        type="text"
        className={styles.inputApiToken}
        placeholder="apiToken"
        value={apiToken}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setApiToken(event.target.value)
        }
      />
      <button className={styles.submit} onClick={() => onClickSubmit()}>
        отправить
      </button>
    </div>
  );
};

export default Registration;
