import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./ChangeUserPassword.module.css";

import { useDispatch, useSelector } from "react-redux";
import { updateActions } from "../../redux/update-slice";
import { userActions } from "../../redux/user-slice";
import Warning from "../UI/utils/Warning";
import Button from "../UI/utils/Button";

export default function ChangeUserPassword(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [warning, setWarning] = useState(null);
  const user = useSelector((state) => state.user.user);
  const newUserPassword = useRef(null);
  const oldUserPassword = useRef(null);
  const checkBoxRef = useRef(null);
  const passwordRef = useRef(null);

  const dispatch = useDispatch();

  function togglePassword() {
    if (checkBoxRef.current.checked) {
      passwordRef.current.type = "text";
      setShowPassword(true);
    } else {
      passwordRef.current.type = "password";
      setShowPassword(false);
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
    if (newUserPassword.current.value === user.password) {
      setWarning("repeatedPassword");
      return;
    }

    if (oldUserPassword.current.value !== user.password) {
      setWarning("password");
      return;
    }
    if (oldUserPassword.current.value === user.password) {
      setWarning(null);
      dispatch(userActions.changeUserPassword(newUserPassword.current.value));
      dispatch(updateActions.shouldUpdate());
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
              value={user.password}
              disabled
              className={styles["current__user__password"]}
            />
            <label className={styles["checkbox-label"]} htmlFor="checkbox">
              {showPassword ? (
                <i className="bi bi-eye-slash-fill" />
              ) : (
                <i className="bi bi-eye-fill" />
              )}
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
