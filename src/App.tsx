import React from "react";

import "./scss/App.scss";
import PanelContact from "./components/Panels/Contact";
import PanelChat from "./components/Panels/Chat";
import Registration from "./components/FormRegistration";

const App: React.FC = () => {
  return (
    <div className="app">
      <Registration/>
      <PanelContact/>
      <PanelChat/>
    </div>
  );
};

export default App;
