import React from "react";
import "./App.scss";
// import TableUser from "./components/TableUser";
import Navigation from "./components/Navigation";
// import Login from "./components/Login";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function App() {
  const dataUserRedux = useSelector((state) => state.user);
  console.log(dataUserRedux);
  return (
    <div className="app-container">
      <Navigation />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
