import React, { useState } from "react";
import styles from "./NavigationMobile.module.css";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedPages from "../UI/AnimatedPages";
const NavigationMobile = () => {
  const [showNavigation, setShowNavigation] = useState(false);

  function toggleNavigation() {
    setShowNavigation((prevState) => !prevState);
  }
  return (
    <AnimatedPages>
      <React.Fragment>
        <div onClick={toggleNavigation} className={styles.hamburger}>
          <span className={showNavigation ? styles.active : ""}></span>
          <span className={showNavigation ? styles.active : ""}></span>
          <span className={showNavigation ? styles.active : ""}></span>
        </div>
        <AnimatePresence exitBeforeEnter>
          {showNavigation && (
            <motion.nav
              key={"navigation"}
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{
                duration: 0.3,
                opacity: {
                  duration: 0.5,
                },
              }}
              className={styles["navigation-mobile"]}
            >
              <ul className={styles["navigation-mobile__list"]}>
                <li>
                  <NavLink
                    onClick={toggleNavigation}
                    activeClassName={styles.active}
                    to="/songs"
                  >
                    All music
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={toggleNavigation}
                    activeClassName={styles.active}
                    to="/playlists"
                  >
                    Your playlists
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={toggleNavigation}
                    activeClassName={styles.active}
                    to="/player"
                  >
                    Player
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={toggleNavigation}
                    activeClassName={styles.active}
                    to="/settings"
                  >
                    Settings
                  </NavLink>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </React.Fragment>
    </AnimatedPages>
  );
};
export default React.memo(NavigationMobile);
