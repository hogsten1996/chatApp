import { Route, Routes } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import { useMeQuery } from "./reducers/auth";
import "./App.css";
import Products from "./pages/Products";
import SinglePurchase from "./pages/SinglePurchase";
import SingleProduct from "./pages/SIngleProduct";
import React from "react";
import { useSelector } from "react-redux";

/**
 * App is the root component of our application.
 * It will render either a login form or the dashboard
 * depending on whether the user is logged in or not.
 */

function App() {
  const me = useSelector((state) => state.auth.user);

  const guestRouter = (
    <Routes>
      <Route path="/*" element={<AuthForm />} />
    </Routes>
  );
  const userRouter = (
    <Routes>
      <Route index element={<Products />} />
      <Route path={"/purchase/:id"} element={<SinglePurchase />} />
      <Route path={"/product/:id"} element={<SingleProduct />} />
    </Routes>
  );

  // const { data: me } = useMeQuery();

  const loggedIn = !!me?.userId;
  return loggedIn ? userRouter : guestRouter;
}

export default App;
