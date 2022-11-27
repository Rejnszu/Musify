import React from "react";
import WelcomePage from "../pages/WelcomePage";
const LoggedOutGroup = () => {
  const isLogged = sessionStorage.getItem("isLogged");
  return (isLogged === "false" || isLogged === null) && <WelcomePage />;
};

export default LoggedOutGroup;
