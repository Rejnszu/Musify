import React from "react";
import styles from "./ItemsListOverlay.module.css";
export default function ItemsListOverlay(props) {
  return <div className={styles.overlay}>{props.children}</div>;
}
