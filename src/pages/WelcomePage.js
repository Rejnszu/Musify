import React, { useRef, useEffect } from "react";
import Button from "../components/UI/Button";

import styles from "./WelcomePage.module.css";
import AnimatedPages from "../components/UI/AnimatedPages";
import LoginForm from "../components/LoginForms/LoginForm";

export default function WelcomePage(props) {
  function logIn() {
    props.logIn();
  }
  const welcomeAdvantageListRef = useRef(null);
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
        <LoginForm logIn={props.logIn} />
      </div>
    </AnimatedPages>
  );
}
