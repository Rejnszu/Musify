import React from "react";
import styles from "./Warning.module.css";
export default function Warning(props) {
  return <span className={styles.warning}>{props.children}</span>;
}
