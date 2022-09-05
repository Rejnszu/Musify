import React from "react";
import AnimatedItems from "../UI/AnimatedItems";
import Button from "../UI/Button";
import styles from "./SuccessfulRegister.module.css";
export default function SuccessfulRegister(props) {
  return (
    <AnimatedItems>
      <div className={styles.succes}>
        <p>Congratulation! You created your account successfully!</p>
        <Button
          onClick={props.displayFormsHandler.bind(null, "login")}
          type="button"
        >
          Continue to logging.
        </Button>
      </div>
    </AnimatedItems>
  );
}
