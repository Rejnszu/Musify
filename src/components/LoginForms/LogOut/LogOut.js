import React from "react";
import styles from "./LogOut.module.css";
import Button from "../../UI/utils/Button";

import { useDeleteCurrentUserMutation } from "../../../redux/api/currentUserApiSlice";
import { useSelector } from "react-redux";

const LogOut = () => {
  const [deleteCurrentUser] = useDeleteCurrentUserMutation();
  const user = useSelector((state) => state.user.user);
  function logOut() {
    deleteCurrentUser(user);
    sessionStorage.setItem("isLogged", "false");
  }
  return (
    <a href="/Musify">
      <Button styles={styles["button--log-out"]} onClick={logOut}>
        Log Out
      </Button>
    </a>
  );
};

export default LogOut;
