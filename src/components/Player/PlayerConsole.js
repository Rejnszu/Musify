import React from "react";
import styles from "./PlayerConsole.module.css";
export default function PlayerConsole() {
  return (
    <div className="center-wrapper">
      <div className={styles["player__console-wrapper"]}>
        <p className={styles["player__song-title"]}>
          I really want to stay at your house
        </p>
        <div className={styles["player__console__buttons-wrapper"]}>
          <button className={styles["player__buttons"]}>
            <i className="fa-sharp fa-solid fa-backward"></i>
          </button>
          <button
            className={`${styles["player__buttons"]} ${styles["player__buttons--main"]}`}
          >
            <i className="bi bi-play-fill"></i>
          </button>
          <button className={styles["player__buttons"]}>
            <i className="fa-sharp fa-solid fa-forward"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
