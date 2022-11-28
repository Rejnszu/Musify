import React from "react";
import { Redirect, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
const LoggedOutGroup = () => {
  const isLogged = sessionStorage.getItem("isLogged");
  return (
    (isLogged === "false" || isLogged === null) && (
      <React.Fragment>
        <Route path="/Musify" exact>
          <WelcomePage />
        </Route>
        <Route path="*">
          <Redirect to="/Musify" />
        </Route>
      </React.Fragment>
    )
  );
};

export default LoggedOutGroup;
