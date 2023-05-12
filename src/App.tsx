import React from "react";

import "./scss/App.scss";
import PanelContact from "./components/Panels/Contact";
import PanelChat from "./components/Panels/Chat";

const App: React.FC = () => {
  return (
    <div className="app">
      <PanelContact/>
      <PanelChat/>
    </div>
  );
};

export default App;
