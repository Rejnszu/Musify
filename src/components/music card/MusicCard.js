import React from "react";
import styles from "./MusicCard.module.css";
export default function MusicCard(props) {
  return (
    <div className={styles["music-card"]}>
      <img
        src="https://i1.sndcdn.com/artworks-000105604285-me2956-t500x500.jpg"
        alt="img"
      />
      <p className={styles["music-card__title"]}>Title: Numb</p>
      <p className={styles["music-card__author"]}>Author: Linkin Park</p>
      <p className={styles["music-card__album"]}>Album: Minutes to Midnight</p>
    </div>
  );
}
