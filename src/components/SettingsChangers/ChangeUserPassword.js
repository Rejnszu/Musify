import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./ChangeUserPassword.module.css";
import Button from "../UI/Button";
import { deleteCurrentUser } from "../../redux/Actions/loginActions";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../../redux/auth-slice";
import Warning from "../UI/Warning";
export default function ChangeUserPassword(props) {
  const currentUser = useSelector((state) => state.authentication.currentUser);
  const [warning, setWarning] = useState(null);

  const newUserPassword = useRef(null);
  const oldUserPassword = useRef(null);
  const checkBoxRef = useRef(null);
  const passwordRef = useRef(null);

  console.log(checkBoxRef.current);
  const dispatch = useDispatch();

  function togglePassword() {
    if (checkBoxRef.current.checked) {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  }

  const [success, setSuccess] = useState(false);
  const changeUserPassword = (e) => {
    e.preventDefault();
    if (
      newUserPassword.current.value === "" ||
      oldUserPassword.current.value === ""
    ) {
      return;
    }
    if (newUserPassword.current.value === currentUser.password) {
      setWarning("repeatedPassword");
      return;
    }

    if (oldUserPassword.current.value !== currentUser.password) {
      setWarning("password");
      return;
    }
    if (oldUserPassword.current.value === currentUser.password) {
      deleteCurrentUser(currentUser);

      setWarning(null);
      dispatch(
        authActions.changeUserPassword({
          currentUserName: currentUser.userName,
          password: newUserPassword.current.value,
        })
      );
      newUserPassword.current.value = "";
      oldUserPassword.current.value = "";
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
            Your current password:
            <input
              ref={passwordRef}
              type="password"
              value={currentUser?.password}
              disabled
              className={styles["current__user__password"]}
            />
            <br />
            <label className={styles["checkbox-label"]} htmlFor="checkbox">
              Show current password
            </label>
            <input
              onChange={togglePassword}
              ref={checkBoxRef}
              className={styles["current__user__toggle-password"]}
              type="checkbox"
              id="checkbox"
            />
          </p>

          <form
            onSubmit={changeUserPassword}
            className={styles["settings__form"]}
          >
            <label>New Password</label>
            <input ref={newUserPassword}></input>
            {warning === "repeatedPassword" && (
              <Warning>It's already your password.</Warning>
            )}

            <label>Enter Your Password</label>
            <input ref={oldUserPassword}></input>
            {warning === "password" && <Warning>Wrong password.</Warning>}
            <Button type="submit">Confirm</Button>
          </form>
        </React.Fragment>
      )}
      {success && (
        <div className={styles.succes}>
          You changed your Password succesfully.
        </div>
      )}
    </motion.div>
  );
}
