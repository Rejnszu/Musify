import React from "react";
import styles from "./Button.module.css";
const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={`${styles.button} ${props.styles}`}
    >
      {props.children}
    </button>
  );
};
export default Button;
