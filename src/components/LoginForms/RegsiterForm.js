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
  const [isInitialRegister, setIsInitialRegister] = useState(true);
  const createUser = (e) => {
    e.preventDefault();
    const newUser = {
      userName: userNameRef.current?.value,
      password: passwordRef.current?.value,
      repeatPassword: repeatPasswordRef.current?.value,
      musicList: [],
      userPlaylists: [],
      uniqueId: Date.now() + Math.floor(Math.random() * 1000),
    };
    if (newUser.userName === "Admin" || newUser.userName === "admin") {
      setWarning("admin");
      return;
    }
    if (newUser.userName === "Admin1" || newUser.userName === "admin1") {
      setWarning("admin1");
      return;
    }
    if (newUser.userName === "Admin2" || newUser.userName === "admin2") {
      setWarning("admin2");
      return;
    }
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
    if (isInitialRegister) {
      setIsInitialRegister(false);
      return;
    }
    sendUserToDatabase(users);

    return () => {
      setIsInitialRegister(true);
    };
  }, [users]);

  return (
    <AnimatedItems>
      <form onSubmit={createUser} className={styles["register-form"]}>
        <label htmlFor="username">User Name</label>
        <input required ref={userNameRef} type="text" id="username" />
        {warning === "admin" && (
          <Warning>Haha, nice try, there can only be one admin.</Warning>
        )}
        {warning === "admin1" && (
          <Warning>You think you are smart, don't you? Nope.</Warning>
        )}
        {warning === "admin2" && (
          <Warning>So much persistence, I appreciate it.</Warning>
        )}
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
