import React from "react";
import styles from "./Button.module.css";
export default function Button(props) {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={`${styles.button} ${props.styles}`}
    >
      {props.children}
    </button>
  );
}
