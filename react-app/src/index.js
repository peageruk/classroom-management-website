import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Zooms from "./components/Zooms";
import Accounts from "./components/Accounts";
import Classes from "./components/Classes";
import Home from "./components/Home";
// import { UserContext } from "./context/UserContext";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <UserContext> */}
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="account" index element={<Accounts />} />
            <Route path="zoom" index element={<Zooms />} />
            <Route path="class" index element={<Classes />} />
            <Route path="login" index element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    {/* </UserContext> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
