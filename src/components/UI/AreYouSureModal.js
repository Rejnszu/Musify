import React from "react";
import Button from "./Button";
import styles from "./AreYouSureModal.module.css";
export default function AreYouSureModal(props) {
  function closeModalRemovePlaylist() {
    props.closeModal();
    props.removePlaylist();
  }
  return (
    <div className={styles["confirm-modal"]}>
      <h2>{props.text}</h2>
      <div className={styles["confirm-modal__button-wrapper"]}>
        <Button onClick={props.closeModal}>Cancel</Button>
        <Button onClick={closeModalRemovePlaylist}>Confirm</Button>
      </div>
    </div>
  );
}
