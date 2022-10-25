import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import styles from "./WelcomePage.module.css";
import AnimatedPages from "../components/UI/AnimatedPages";
import LoginForm from "../components/LoginForms/LoginForm";
import RegsiterForm from "../components/LoginForms/RegsiterForm";
import SuccessfulRegister from "../components/LoginForms/SuccessfulRegister";

export default function WelcomePage(props) {
  const welcomeAdvantageListRef = useRef(null);
  const [displayForms, setDisplayForms] = useState("login");

  const displayFormsHandler = (value) => {
    setDisplayForms(value);
  };
  useEffect(() => {
    Array.from(welcomeAdvantageListRef.current?.children).forEach((node, i) => {
      setTimeout(() => {
        node.classList.add(styles.active);
      }, i * 300);
    });
  });

  return (
    <AnimatedPages>
      <div className={styles["welcome__page"]}>
        <h2 className={styles["welcome__title"]}>Welcome to Musify!</h2>
        <div
          ref={welcomeAdvantageListRef}
          className={styles["welcome__advantage-list"]}
        >
          <p className={styles["welcome__advantage"]}>
            A place where you can fulfill all your music dreams!
          </p>
          <p className={styles["welcome__advantage"]}>
            All the functionality you need in one place!
          </p>

          <p className={styles["welcome__advantage"]}>Try it out for free!</p>
        </div>
        <AnimatePresence exitBeforeEnter>
          {displayForms === "login" && (
            <LoginForm
              displayFormsHandler={displayFormsHandler}
              key={"login"}
              logIn={props.logIn}
            />
          )}
          {displayForms === "register" && (
            <RegsiterForm
              displayFormsHandler={displayFormsHandler}
              key={"register"}
            />
          )}
          {displayForms === "success" && (
            <SuccessfulRegister
              displayFormsHandler={displayFormsHandler}
              key={"success"}
            />
          )}
        </AnimatePresence>
      </div>
    </AnimatedPages>
  );
}
