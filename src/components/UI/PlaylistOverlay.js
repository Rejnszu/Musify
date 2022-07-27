import React from "react";
import styles from "./PlaylistOverlay.module.css";

export default function CardListOverlay(props) {
  return <div className={styles.overlay}>{props.children}</div>;
}
