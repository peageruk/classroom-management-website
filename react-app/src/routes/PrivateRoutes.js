import React from "react";
import { Route, Routes } from "react-router";

const PrivateRoutes = (props) => {
  return (
    <>
      {/* <Routes> */}
      <Route path={props.path} element={props.children} />
      {/* </Routes> */}
    </>
  );
};

export default PrivateRoutes;
