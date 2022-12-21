import React from "react";
import styles from "./NavigationDesktop.module.css";
import { NavLink } from "react-router-dom";

const NavigationDesktop = () => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles["navigation__list"]}>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/songs"
          >
            All music
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/playlists"
          >
            Your playlists
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/player"
          >
            Player
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/charts"
          >
            Top Charts
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/settings"
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default React.memo(NavigationDesktop);
