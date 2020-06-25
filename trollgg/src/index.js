import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

//offline을 하고 싶거나 빠른 loading을 원하면 unregister()를 register()로 바꿔라
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
