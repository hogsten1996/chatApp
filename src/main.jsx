import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import {Provider} from "react-redux";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import store from "./store";
import "./app.css";
import Nav from "./components/Nav";
import SinglePurchase from "./pages/SinglePurchase";
import SingleProduct from "./pages/SIngleProduct";
import Products from "./pages/Products";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Nav/>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
