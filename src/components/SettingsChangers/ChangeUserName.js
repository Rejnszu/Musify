import React, { useRef, useState } from "react";
import styles from "./ChangeUserName.module.css";
import Warning from "../UI/utils/Warning";
import Button from "../UI/utils/Button";

import { motion } from "framer-motion";
import { checkIfUserExist } from "../../utils/checkIfUserExist";
import { userActions } from "../../redux/user-slice";

import { useDispatch, useSelector } from "react-redux";
import { updateActions } from "../../redux/update-slice";
import useDeleteUser from "../../hooks/useDeleteUser";

export default function ChangeUserName(props) {
  const [warning, setWarning] = useState(null);

  const user = useSelector((state) => state.user.user);
  const [onDeleteUser] = useDeleteUser();
  const newUserNameRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const changeUserName = async (e) => {
    e.preventDefault();
    if (confirmPasswordRef.current.value !== user.password) {
      setWarning("password");
      return;
    }
    if (newUserNameRef.current.value === user.userName) {
      setWarning("repeatUserName");
      return;
    }
    if (await checkIfUserExist(newUserNameRef.current.value)) {
      setWarning("userNameExist");
      return;
    }

    if (confirmPasswordRef.current.value === user.password) {
      onDeleteUser(user);
      sessionStorage.setItem("currentUser", newUserNameRef.current.value);
      setWarning(null);
      dispatch(userActions.changeUserName(newUserNameRef.current.value));
      dispatch(updateActions.shouldUpdate());
      newUserNameRef.current.value = "";
      confirmPasswordRef.current.value = "";
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
    }
  };
  return (
    <motion.div
      key={props.animate}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={styles["settings__change"]}
    >
      {!success && (
        <React.Fragment>
          <p className={styles["current__user"]}>
            Your current account name:{" "}
            <span className={styles["current__user__name"]}>
              {user.userName}
            </span>
          </p>

          <form onSubmit={changeUserName} className={styles["settings__form"]}>
            <label>New UserName</label>
            <input ref={newUserNameRef}></input>
            {warning === "repeatUserName" && (
              <Warning>It's already your userName.</Warning>
            )}
            {warning === "userNameExist" && (
              <Warning>UserName like this already exists.</Warning>
            )}
            <label>Enter Your Password</label>
            <input ref={confirmPasswordRef}></input>
            {warning === "password" && <Warning>Wrong password.</Warning>}
            <Button type="submit">Confirm</Button>
          </form>
        </React.Fragment>
      )}
      {success && (
        <div className={styles.succes}>
          You changed your userName succesfully.
        </div>
      )}
    </motion.div>
  );
}
