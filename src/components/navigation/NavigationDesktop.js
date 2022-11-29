import React from "react";
import styles from "./NavigationDesktop.module.css";
import { NavLink } from "react-router-dom";
import AnimatedPages from "../UI/FramerGenerals/AnimatedPages";
const NavigationDesktop = () => {
  return (
    // <AnimatedPages>
    <nav className={styles.navigation}>
      <ul className={styles["navigation__list"]}>
        <li>
          <NavLink activeClassName={styles.active} to="/songs">
            All music
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.active} to="/playlists">
            Your playlists
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.active} to="/player">
            Player
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.active} to="/settings">
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
    // </AnimatedPages>
  );
};
export default React.memo(NavigationDesktop);
