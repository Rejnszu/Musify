import React, { useEffect, useRef, useState } from "react";
import AnimatedItems from "../UI/AnimatedItems";
import Button from "../UI/Button";
import styles from "./LoginForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import Warning from "../UI/Warning";
import {
  getCurrentUser,
  sendCurrentUser,
} from "../../redux/Actions/loginActions";
import { authActions } from "../../redux/auth-slice";

export default function LoginForm(props) {
  const users = useSelector((state) => state.authentication.users);
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  const dispatch = useDispatch();
  const [warning, setWarning] = useState(null);
  function validateUser(name, password) {
    const currentUser = users.find((user) => user.userName === name);
    return currentUser.userName === name && currentUser.password === password;
  }
  function logInHandler(e) {
    e.preventDefault();
    if (!users.some((user) => user.userName === userNameRef.current.value)) {
      setWarning("userDontExist");
      return;
    }

    if (validateUser(userNameRef.current.value, passwordRef.current.value)) {
      const currentUser = users.find(
        (user) => user.userName === userNameRef.current.value
      );

      sendCurrentUser(currentUser).then(() => {
        getCurrentUser(currentUser).then((data) =>
          dispatch(authActions.setCurrentUser(data))
        );
      });

      sessionStorage.setItem("currentUser", userNameRef.current.value);
      props.logIn();
      setWarning(null);
      return;
    }
    setWarning("wrongPassword");
  }

  return (
    <AnimatedItems>
      <form onSubmit={logInHandler} className={styles["login-form"]}>
        <label htmlFor="username">User Name</label>
        <input ref={userNameRef} type="text" id="username" />
        {warning === "userDontExist" && <Warning>User doesnt exist.</Warning>}
        <label htmlFor="password">Password</label>
        <input ref={passwordRef} type="password" id="password" />
        {warning === "wrongPassword" && <Warning>Wrong Password.</Warning>}
        <Button type="submit">Log in</Button>
        <Button
          onClick={props.displayFormsHandler.bind(null, "register")}
          type="button"
        >
          Don't have an account yet?
          <br /> Create one!
        </Button>
      </form>
    </AnimatedItems>
  );
}
