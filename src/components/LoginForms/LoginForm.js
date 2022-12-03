import React, { useRef, useState, useEffect } from "react";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../UI/utils/Button";
import AnimatedItems from "../UI/FramerGenerals/AnimatedItems";
import Warning from "../UI/utils/Warning";
import { useCreateCurrentUserMutation } from "../../redux/api/currentUserApiSlice";
import { useGetUsersDataQuery } from "../../redux/api/dataApiSlice";
export default function LoginForm(props) {
  const { refetch } = useGetUsersDataQuery();
  const navigate = useNavigate();
  const users = useSelector((state) => state.authentication.users);
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const [warning, setWarning] = useState(null);
  const [createCurrentUser] = useCreateCurrentUserMutation();

  function logIn(currentUser) {
    createCurrentUser(currentUser);
    sessionStorage.setItem("currentUser", userNameRef.current.value);
    sessionStorage.setItem("isLogged", "true");
    navigate("/songs");
    setWarning(null);
  }

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
      logIn(currentUser);
      return;
    }
    setWarning("wrongPassword");
  }

  useEffect(() => {
    refetch();
  }, []);
  return (
    <AnimatedItems>
      <form onSubmit={logInHandler} className={styles["login-form"]}>
        <label htmlFor="username">User Name</label>
        <input ref={userNameRef} type="text" id="username" />
        {warning === "userDontExist" && <Warning>User doesnt exist.</Warning>}
        <label htmlFor="password">Password</label>
        <input ref={passwordRef} type="password" id="password" />
        {warning === "wrongPassword" && <Warning>Wrong Password.</Warning>}
        <Button type="submit">Sign in</Button>
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
