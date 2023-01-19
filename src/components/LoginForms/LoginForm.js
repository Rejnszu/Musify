import React, { useRef, useState } from "react";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/user-slice";
import Button from "../UI/utils/Button";
import AnimatedItems from "../UI/FramerGenerals/AnimatedItems";
import Warning from "../UI/utils/Warning";
import { useCreateCurrentUserMutation } from "../../redux/api/currentUserApiSlice";
import { checkIfUserExist } from "../../utils/checkIfUserExist";
import Spinner from "../UI/utils/Spinner";

export default function LoginForm(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const [warning, setWarning] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [createCurrentUser] = useCreateCurrentUserMutation();

  function logIn(currentUser) {
    createCurrentUser(currentUser);
    sessionStorage.setItem("currentUser", currentUser.userName);
    sessionStorage.setItem("isLogged", "true");
    dispatch(userActions.setUser(currentUser));
    navigate("/songs");
    setWarning(null);
    setIsLoading(false);
  }

  function validateUser(name, password, data) {
    const user = data;
    return user.userName === name && user.password === password;
  }

  function logInHandler(e) {
    e.preventDefault();
    setWarning(false);
    setIsLoading(true);
    checkIfUserExist(userNameRef.current.value).then((data) => {
      if (!data) {
        setWarning("userDontExist");
        setIsLoading(false);
        return;
      }

      if (
        validateUser(userNameRef.current.value, passwordRef.current.value, data)
      ) {
        const user = data;
        logIn(user);

        return;
      }

      setWarning("wrongPassword");
      setIsLoading(false);
    });
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
        {isLoading && <Spinner />}
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
