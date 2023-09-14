import { Route, Routes } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import { useMeQuery } from "./reducers/auth";
import "./App.css";
import Products from "./pages/Products";
import SinglePurchase from "./pages/SinglePurchase";
import SingleProduct from "./pages/SIngleProduct";
import React from "react";
// import jwt from "jsonwebtoken";

/**
 * App is the root component of our application.
 * It will render either a login form or the dashboard
 * depending on whether the user is logged in or not.
 */
function App() {
    const guestRouter = (
        <Routes>
            <Route path="/*" element={<AuthForm />} />
        </Routes>
    );
    const userRouter = (
        <Routes>
            <Route index element={<Products/>}/>
            <Route path={"/purchase/:id"} element={<SinglePurchase/>}/>
            <Route path={"/product/:id"} element={<SingleProduct/>}/>
        </Routes>
    );

    // const { data: me } = useMeQuery();
    // console.log(me);
    const token = sessionStorage.getItem("token");
    // const user = jwt.verify(token, process.env.JWT)
    // console.log(user);
    // const loggedIn = !!me?.id;
    return token ? userRouter : guestRouter;
}

export default App;
