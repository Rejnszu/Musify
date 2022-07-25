import React from "react";
import styles from "./Navigation.module.css";
export default function Navigation(props) {
  return (
    <nav className={styles.navigation}>
      <ul className={styles["navigation__list"]}>
        <li>All music</li>
        <li>Your playlists</li>
        <li>Something else</li>
        <li>
          Music cart <i class="bi bi-music-note-list"></i>
        </li>
      </ul>
      {props.children}
    </nav>
  );
}
