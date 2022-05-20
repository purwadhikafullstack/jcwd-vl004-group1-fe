import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers/index";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
