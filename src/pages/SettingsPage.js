import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ChangeUserName from "../components/SettingsChangers/ChangeUserName";
import ChangeUserPassword from "../components/SettingsChangers/ChangeUserPassword";
import DeleteAccount from "../components/SettingsChangers/DeleteAccount";
import AnimatedPages from "../components/UI/FramerGenerals/AnimatedPages";

import styles from "./SettingPage.module.css";
import Header from "../components/UI/utils/Header";
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
      <main className={styles.settings}>
        <Header>Your account Informations</Header>

        <ul className={styles["settings__list"]}>
          <li>
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
          </li>
          <li>
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
          </li>
          <li>
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
          </li>
        </ul>
      </main>
    </AnimatedPages>
  );
};
export default SettingsPage;
