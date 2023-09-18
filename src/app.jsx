import {Route, Routes} from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import "./App.css";
import Products from "./pages/Products";
import SinglePurchase from "./pages/SinglePurchase";
import SingleProduct from "./pages/SIngleProduct";
import React from "react";
import {useSelector} from "react-redux";
import Posts from "./pages/Posts";
import UserPosts from "./pages/UserPosts";

function App() {

    const me = useSelector((state) => state.auth.credentials.user);

    const guestRouter = (
        <Routes>
            <Route path="/*" element={<AuthForm/>}/>
        </Routes>
    );
    const userRouter = (
        <Routes>
            <Route index element={<Products/>}/>
            <Route path={"/posts"} element={<Posts/>}/>
            <Route path={"/purchase/:id"} element={<SinglePurchase/>}/>
            <Route path={"/product/:id"} element={<SingleProduct/>}/>
            <Route path={"/user"} element={<UserPosts/>}/>
        </Routes>
    );

    const loggedIn = me.userId;
    return loggedIn !== null ? userRouter : guestRouter;
}

export default App;
