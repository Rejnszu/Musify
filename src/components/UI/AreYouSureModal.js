import React from "react";
import Button from "./Button";
import styles from "./AreYouSureModal.module.css";
export default function AreYouSureModal(props) {
  return (
    <div className={styles["confirm-modal"]}>
      <h2>{props.text}</h2>
      {props.children}
      <div className={styles["confirm-modal__button-wrapper"]}>
        <Button onClick={props.closeModal}>Cancel</Button>
        <Button
          onClick={() => {
            props.removeItem();
            props.closeModal();
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
