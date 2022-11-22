import React, { useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import styles from "./ChangeUserName.module.css";
import { deleteCurrentUser } from "../../actions/loginActions";
import { useDispatch, useSelector } from "react-redux";
import { updateActions } from "../../redux/update-slice";
import { authActions } from "../../redux/auth-slice";
import Warning from "../UI/Warning";
import Button from "../UI/Button";

export default function ChangeUserName(props) {
  const [warning, setWarning] = useState(null);
  const users = useSelector((state) => state.authentication.users);

  const currentUser = useMemo(
    () =>
      users.find(
        (user) => user.userName === sessionStorage.getItem("currentUser")
      ),
    [users]
  );
  const newUserNameRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const changeUserName = (e) => {
    e.preventDefault();

    if (newUserNameRef.current.value === currentUser.userName) {
      setWarning("repeatUserName");
      return;
    }
    if (users.some((user) => user.userName === newUserNameRef.current.value)) {
      setWarning("userNameExist");
      return;
    }
    if (confirmPasswordRef.current.value !== currentUser.password) {
      setWarning("password");
      return;
    }
    if (confirmPasswordRef.current.value === currentUser.password) {
      deleteCurrentUser(currentUser);
      sessionStorage.setItem("currentUser", newUserNameRef.current.value);
      setWarning(null);
      dispatch(
        authActions.changeUserName({
          currentUserName: currentUser.userName,
          newUserName: newUserNameRef.current.value,
        })
      );
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
              {currentUser?.userName}
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
