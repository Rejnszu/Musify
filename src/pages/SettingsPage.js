import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";

import ChangeUserName from "../components/SettingsChangers/ChangeUserName";
import ChangeUserPassword from "../components/SettingsChangers/ChangeUserPassword";
import DeleteAccount from "../components/SettingsChangers/DeleteAccount";
import AnimatedPages from "../components/UI/AnimatedPages";

import styles from "./SettingPage.module.css";
const SettingsPage = () => {
  const [displayChangers, setDisplayChangers] = useState(null);

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
                  <ChangeUserName animate="userName" />
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
                  <ChangeUserPassword animate="password" />
                )}
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
                  <DeleteAccount animate="delete" />
                )}
              </AnimatePresence>
            </div>
          </li>
        </ul>
      </div>
    </AnimatedPages>
  );
};
export default SettingsPage;
