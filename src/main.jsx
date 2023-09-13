import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import {ApiProvider} from "@reduxjs/toolkit/src/query/react/";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {storeApi} from "./reducers/api.js";
import "./app.css";
import Nav from "./Nav";
import SinglePurchase from "./SinglePurchase";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ApiProvider api={storeApi}>
                <Nav/>
                <Routes>
                    <Route index element={<App/>}/>
                    <Route path={"/purchase/:id"} element={<SinglePurchase/>}/>
                </Routes>
            </ApiProvider>
        </BrowserRouter>
    </React.StrictMode>
);
