import React from "react";
import styles from "./EmptyList.module.css";
export default function EmptyList() {
  return (
    <p className={styles.emptyList}>
      Couldn't find any song matching your filters!
    </p>
  );
}
