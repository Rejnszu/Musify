import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
const LoggedOutGroup = () => {
  const isLogged = sessionStorage.getItem("isLogged");
  const location = useLocation();
  return (
    (isLogged === "false" || isLogged === null) && (
      <React.Fragment>
        <Routes key={location.pathname}>
          <Route path="/Musify" element={<WelcomePage />} />
          <Route path="*" element={<Navigate replace to="/Musify" />} />
        </Routes>
      </React.Fragment>
    )
  );
};

export default LoggedOutGroup;
