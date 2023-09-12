import React from "react";
import ReactDOM from "react-dom/client";
import  App  from "./app";
import {ApiProvider} from "@reduxjs/toolkit/src/query/react/";
import {schoolApi} from "./reducers/students.js";
import "./app.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <ApiProvider api={schoolApi}>
          <App />
      </ApiProvider>
  </React.StrictMode>
);
