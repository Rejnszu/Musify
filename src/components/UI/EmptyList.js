import React from "react";
import styles from "./EmptyList.module.css";
export default function EmptyList(props) {
  return <p className={styles.emptyList}>{props.children}</p>;
}
