//Quelle: Grider, streams/client/index.js (modifiziert)
//packages
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
//components
import App from "./components/App";
//redux store
import store from "./store"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.querySelector('#root')
);