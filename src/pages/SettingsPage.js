import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import AnimatedPages from "../components/UI/AnimatedPages";
import Button from "../components/UI/Button";
import { deleteCurrentUser } from "../redux/Actions/loginActions";

import { authActions } from "../redux/auth-slice";
import styles from "./SettingPage.module.css";
export default function SettingsPage() {
  const [displayChangers, setDisplayChangers] = useState(null);
  const history = useHistory();
  const currentUser = useSelector((state) => state.authentication.currentUser);

  const newUserNameRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const dispatch = useDispatch();
  function getData(e) {
    if (
      displayChangers !== null &&
      e.target.getAttribute("data-change") === displayChangers
    ) {
      setDisplayChangers(null);
      return;
    }
    setDisplayChangers(e.target.getAttribute("data-change"));
  }
  const changeUserName = (e) => {
    e.preventDefault();
    if (confirmPasswordRef.current.value === currentUser.password) {
      deleteCurrentUser(currentUser);
      sessionStorage.setItem("currentUser", newUserNameRef.current.value);

      dispatch(
        authActions.changeUserName({
          currentUserName: currentUser.userName,
          newUserName: newUserNameRef.current.value,
        })
      );
    }
  };
  return (
    <AnimatedPages>
      <div className={styles.settings}>
        <h2 className={styles["settings__title"]}>Your account Informations</h2>

        <ul className={styles["settings__list"]}>
          <li>
            <div>
              <p
                className={styles["settings__intro"]}
                onClick={getData}
                data-change="userName"
              >
                Account Name
                <i className="bi bi-arrow-bar-down" data-change="userName" />
              </p>
              <AnimatePresence exitBeforeEnter>
                {displayChangers === "userName" && (
                  <motion.div
                    key="userName"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles["settings__change"]}
                  >
                    <p className={styles["current__user"]}>
                      Your current account name:{" "}
                      <span className={styles["current__user__name"]}>
                        {currentUser?.userName}
                      </span>
                    </p>
                    <form
                      onSubmit={changeUserName}
                      className={styles["settings__form"]}
                    >
                      <label>New UserName</label>
                      <input ref={newUserNameRef}></input>
                      <label>Enter Your Password</label>
                      <input ref={confirmPasswordRef}></input>
                      <Button type="submit">Confirm</Button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>
          <li>
            <div>
              <p
                className={styles["settings__intro"]}
                onClick={getData}
                data-change="password"
              >
                Account Password
                <i className="bi bi-arrow-bar-down" data-change="password" />
              </p>
              <AnimatePresence exitBeforeEnter>
                {displayChangers === "password" && (
                  <motion.div
                    key="password"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={styles["settings__change"]}
                  >
                    321321
                  </motion.div>
                )}{" "}
              </AnimatePresence>
            </div>
          </li>
          <li>
            <div>
              <p
                className={styles["settings__intro"]}
                onClick={getData}
                data-change="delete"
              >
                Delete Account
                <i className="bi bi-trash" data-change="delete" />
              </p>
              <AnimatePresence exitBeforeEnter>
                {displayChangers === "delete" && (
                  <motion.div
                    key="delete"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={styles["settings__change"]}
                  >
                    321321
                  </motion.div>
                )}{" "}
              </AnimatePresence>
            </div>
          </li>
        </ul>
      </div>
    </AnimatedPages>
  );
}
