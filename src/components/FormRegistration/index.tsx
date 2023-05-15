import React from "react";
import styles from "./registration.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setIdProfile } from "../../redux/slices/profileSlice";
import { setFormRegistration } from "../../redux/slices/uiControllerSlice";
import axios from "axios";

const Registration: React.FC = () => {
  const dispatch = useDispatch();
  const { idInstance, apiTokenInstance } = useSelector(
    (state: RootState) => state.profile
  );
  const [idInstanceUI, setIdInstance] = React.useState("");
  const [apiTokenInstanceUI, setApiToken] = React.useState("");

  const isFirstOpening = React.useRef(true);
  const failedProfile = React.useRef(false);

  const onClickSubmit = () => {
    async function getResult() {
      await axios
        .get(
          `https://api.green-api.com/waInstance${idInstanceUI}/getStateInstance/${apiTokenInstanceUI}`
        )
        .then(() => {
          failedProfile.current = false;
          dispatch(setIdProfile({ idInstanceUI, apiTokenInstanceUI }));
          console.log("success!");
        })
        .catch((error) => {
          failedProfile.current = true;
          console.log("error_getInstance", error);
        });
    }
    getResult();
  };

  React.useEffect(() => {
    if (!isFirstOpening.current) {
      dispatch(setFormRegistration(false));
    }
  }, [idInstance]);

  React.useEffect(() => {
    isFirstOpening.current = false;
  }, []);

  return (
    <div className={styles.windowRegistation}>
      <h1>Зарегистрироваться</h1>
      <input
        type="text"
        placeholder="idInstance"
        value={idInstanceUI}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setIdInstance(event.target.value)
        }
      />

      <div className={styles.inputApiToken}>
        <input
          type="text"
          placeholder="apiToken"
          value={apiTokenInstanceUI}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setApiToken(event.target.value)
          }
        />
        {failedProfile.current && (
          <p className={styles.failedRegText}>
            Неверный idInstance или ApiToken
          </p>
        )}
      </div>

      <button className={styles.submit} onClick={() => onClickSubmit()}>
        отправить
      </button>
    </div>
  );
};

export default Registration;
