import React from "react";
import styles from "./Hello.module.css";
export default function Hello(props) {
  return <p className={styles.hello}>Welcome to Musify, {props.children}.</p>;
}
