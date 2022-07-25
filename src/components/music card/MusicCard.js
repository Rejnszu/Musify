import React from "react";
import styles from "./MusicCard.module.css";
export default function MusicCard(props) {
  return (
    <div className={styles["music-card"]}>
      <img src={props.img} alt={props.id} />
      <p className={styles["music-card__title"]}>Title: {props.title}</p>
      <p className={styles["music-card__author"]}>Author: {props.author}</p>
      <p className={styles["music-card__album"]}>Album: {props.album}</p>
    </div>
  );
}
