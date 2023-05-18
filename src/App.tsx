import React from "react";

import "./App.scss";
import { useSelector } from "react-redux";

import PanelContact from "./components/Panels/Contact";
import PanelChat from "./components/Panels/Chat";
import Registration from "./components/Forms/FormRegistration";
import FormAddContact from "./components/Forms/FormAddContact";
import { RootState } from "./redux/store";

const App: React.FC = () => {
  const { formRegistration, formAddContact, panelChat } = useSelector(
    (state: RootState) => state.uiController
  );

  return (
    <div className="app">
      {formRegistration === true ? (
        <Registration />
      ) : (
        <div className="panelBlock">
          {formAddContact && <FormAddContact />}
          <PanelContact />
          {panelChat === true ? (
            <PanelChat />
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
