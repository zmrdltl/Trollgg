import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
//offline을 하고 싶거나 빠른 loading을 원하면 unregister()를 register()로 바꿔라
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
