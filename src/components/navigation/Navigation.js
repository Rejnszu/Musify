import React from "react";
import styles from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
export default function Navigation(props) {
  return (
    <nav className={styles.navigation}>
      <ul className={styles["navigation__list"]}>
        <li>
          <NavLink activeClassName={styles.active} to="/music">
            All music
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.active} to="/playlists">
            Your playlists
          </NavLink>
        </li>
        <li>Something else</li>
        <li>
          Music cart <i className="bi bi-music-note-list"></i>
        </li>
      </ul>
      {props.children}
    </nav>
  );
}
