import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Accounts from "../components/Accounts";
import Zooms from "../components/Zooms";
import Classes from "../components/Classes";
import Login from "../components/Login";
import App from "../App";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="account" index element={<Accounts />} />
        <Route path="zoom" index element={<Zooms />} />
        <Route path="class" index element={<Classes />} />
        <Route path="login" index element={<Login />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
