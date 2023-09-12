import React from "react";
import ReactDOM from "react-dom/client";
import  App  from "./app";
import {ApiProvider} from "@reduxjs/toolkit/src/query/react/";
import {storeApi} from "./reducers/api.js";
import "./app.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <ApiProvider api={storeApi}>
          <App />
      </ApiProvider>
  </React.StrictMode>
);
