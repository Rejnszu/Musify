import React from "react";
import Button from "./Button";
import styles from "./AreYouSureModal.module.css";
export default function AreYouSureModal(props) {
  function closeModalRemove() {
    props.closeModal();
    props.removeItem();
  }
  return (
    <div className={styles["confirm-modal"]}>
      <h2>{props.text}</h2>
      <div className={styles["confirm-modal__button-wrapper"]}>
        <Button onClick={props.closeModal}>Cancel</Button>
        <Button onClick={closeModalRemove}>Confirm</Button>
      </div>
    </div>
  );
}
