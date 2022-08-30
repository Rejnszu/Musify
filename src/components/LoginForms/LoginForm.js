import React from "react";
import Button from "../UI/Button";
import styles from "./LoginForm.module.css";
export default function LoginForm(props) {
  return (
    <form className={styles["login-form"]}>
      <label htmlFor="username">User Name</label>
      <input type="text" id="username" />
      <label htmlFor="password">Password</label>
      <input type="text" id="password" />
      <Button type="submit" onClick={props.logIn}>
        Log in
      </Button>
    </form>
  );
}
