import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage";
const LoggedOutGroup = () => {
  const isLogged = sessionStorage.getItem("isLogged");
  const location = useLocation();
  return (
    (isLogged === "false" || isLogged === null) && (
      <React.Fragment>
        <Routes key={location.pathname}>
          <Route path="/Musify" element={<HomePage />} />
          <Route path="*" element={<Navigate replace to="/Musify" />} />
        </Routes>
      </React.Fragment>
    )
  );
};

export default LoggedOutGroup;
