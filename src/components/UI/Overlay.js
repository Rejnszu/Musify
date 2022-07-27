import React from "react";
import styles from "./Overlay.module.css";

export default function CardListOverlay(props) {
  return <div className={styles.overlay}>{props.children}</div>;
}
