import React from "react";
import "./App.scss";
import Navigation from "./components/Navigation";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
function App() {
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
