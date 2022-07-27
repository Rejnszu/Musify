import React from "react";
import styles from "./Button.module.css";
export default function Button(props) {
  return (
    <button
      onClick={props.onClick}
      type="button"
      className={`${styles.button} ${props.styles}`}
    >
      {props.children}
    </button>
  );
}
