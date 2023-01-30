import React, { useRef, useEffect, useState } from "react";

import { AnimatePresence } from "framer-motion";
import styles from "./HomePage.module.css";
import AnimatedPages from "../components/UI/FramerGenerals/AnimatedPages";
import LoginForm from "../components/LoginForms/LoginForm";
import RegsiterForm from "../components/LoginForms/RegsiterForm";
import SuccessfulRegister from "../components/LoginForms/SuccessfulRegister";
import Header from "../components/UI/utils/Header";
export default function HomePage(props) {
  const homeAdvantageListRef = useRef(null);
  const [displayForms, setDisplayForms] = useState("login");

  const displayFormsHandler = (value) => {
    setDisplayForms(value);
  };

  useEffect(() => {
    Array.from(homeAdvantageListRef.current?.children).forEach((node, i) => {
      setTimeout(() => {
        node.classList.add(styles.active);
      }, i * 300);
    });
  });

  return (
    <AnimatedPages>
      <main className={styles["home__page"]}>
        <Header>Welcome to Musify!</Header>
        <div
          ref={homeAdvantageListRef}
          className={styles["home__advantage-list"]}
        >
          <p className={styles["home__advantage"]}>
            A place where you can fulfill all your music dreams!
          </p>
          <p className={styles["home__advantage"]}>
            All the functionality you need in one place!
          </p>

          <p className={styles["home__advantage"]}>Try it out for free!</p>
        </div>
        <AnimatePresence exitBeforeEnter>
          {displayForms === "login" && (
            <LoginForm
              displayFormsHandler={displayFormsHandler}
              key={"login"}
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
      </main>
    </AnimatedPages>
  );
}
