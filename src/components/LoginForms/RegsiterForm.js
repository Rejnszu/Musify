import React, { useEffect, useRef, useState } from "react";
import styles from "./RegisterForm.module.css";
import Button from "../UI/Button";

import { sendUserToDatabase } from "../../redux/Actions/authActions";
import AnimatedItems from "../UI/AnimatedItems";
import { authActions } from "../../redux/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import Warning from "../UI/Warning";
export default function RegsiterForm(props) {
  const dispatch = useDispatch();
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const repeatPasswordRef = useRef(null);
  const [warning, setWarning] = useState(null);
  const users = useSelector((state) => state.authentication.users);

  const createUser = (e) => {
    e.preventDefault();
    const newUser = {
      userName: userNameRef.current?.value,
      password: passwordRef.current?.value,
      repeatPassword: repeatPasswordRef.current?.value,
      musicList: ["empty"],
      uniqueId: Date.now() + Math.floor(Math.random() * 1000),
    };
    if (users.some((user) => user.userName === newUser.userName)) {
      setWarning("exist");
      return;
    }
    if (newUser.password.length < 5) {
      setWarning("short");
      return;
    }
    if (newUser.password !== newUser.repeatPassword) {
      setWarning("repeat");
      return;
    }

    props.displayFormsHandler("success");
    dispatch(authActions.addNewUser(newUser));
  };

  useEffect(() => {
    sendUserToDatabase(users);
  }, [users]);

  return (
    <AnimatedItems>
      <form onSubmit={createUser} className={styles["register-form"]}>
        <label htmlFor="username">User Name</label>
        <input required ref={userNameRef} type="text" id="username" />
        {warning === "exist" && (
          <Warning>User with this name already exists.</Warning>
        )}
        <label htmlFor="password">Password</label>
        <input required ref={passwordRef} type="password" id="password" />
        {warning === "short" && (
          <Warning>Password must be at least 5 character long.</Warning>
        )}
        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          required
          ref={repeatPasswordRef}
          type="password"
          id="repeatPassword"
        />
        {warning === "repeat" && (
          <Warning>Password is different from this above.</Warning>
        )}
        <Button type="submit">Create Account</Button>
        <Button
          onClick={props.displayFormsHandler.bind(null, "login")}
          styles={styles["button--register-form-close"]}
          type={"button"}
        >
          <i className="bi bi-x-lg"></i>
        </Button>
      </form>
    </AnimatedItems>
  );
}
