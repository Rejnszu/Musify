import React from "react";
import styles from "./Spinner.module.scss";
const Spinner = (props) => {
  return (
    <div className={styles["spinner-container"]}>
      <div className={`${styles["loading-spinner"]} ${props.styles}`}></div>
    </div>
  );
};

export default Spinner;
