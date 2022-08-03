import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import App from "./App";
import NewEmail from "./Component/Dashboard/NewEmail";
import Login from "./Component/Header/Login";
import Register from "./Component/Header/Register";

function RouteMain() {
  return (
   
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Register />} />
        <Route path="/dash" exact element={<NewEmail />} />
      </Routes>
   
  );
}

export default RouteMain;