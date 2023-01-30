import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
let initialLoad = true;
const SecureGuard = (props) => {
  const currentUser = sessionStorage.getItem("currentUser");
  const user = useSelector((state) => state.user.user);
  const isLogged = sessionStorage.getItem("isLogged");
  const location = useLocation();

  function secureAccount() {
    sessionStorage.removeItem("currentUser");
    sessionStorage.setItem("isLogged", "false");
  }

  if (isLogged !== "true") {
    secureAccount();
  }
  useEffect(() => {
    if (isLogged !== "true") {
      secureAccount();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isLogged === "true" && !initialLoad) {
      sessionStorage.setItem("currentUser", user.userName);
    }
    initialLoad = false;
  }, [currentUser]);

  return props.children;
};

export default SecureGuard;
