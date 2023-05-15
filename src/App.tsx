import React from "react";

import "./scss/App.scss";
import { useSelector } from "react-redux";

import PanelContact from "./components/Panels/Contact";
import PanelChat from "./components/Panels/Chat";
import Registration from "./components/FormRegistration";
import { RootState } from "./redux/store";

const App: React.FC = () => {
  const { formRegistration } = useSelector(
    (state: RootState) => state.uiController
  );
    
  return (
    <div className="app">
      {formRegistration && <Registration />}
      <PanelContact />
      <PanelChat />
    </div>
  );
};

export default App;
