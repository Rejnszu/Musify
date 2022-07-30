import React from "react";
import styles from "./AddToPlaylistItem.module.css";
import { useRef } from "react";
export default function AddToPlaylistItem(props) {
  const inputRef = useRef(null);

  function addToSelected() {
    if (inputRef.current.checked === true) {
      props.addPlaylistHandler(props.playlist);
    } else {
      props.removePlaylistHandler(props.playlist);
    }
  }
  return (
    <div className={styles["playlist-item"]}>
      <input
        onClick={addToSelected}
        ref={inputRef}
        className={styles["playlist-item__input"]}
        type="checkbox"
        key={props.i}
        id={props.id}
        value={props.id}
      />
      <span className={styles["playlist-item__badge"]}>
        <i className="bi bi-check-all"></i>
      </span>
      <label
        className={styles["playlist-item__input__label"]}
        htmlFor={props.id}
      >
        {props.title}
      </label>
    </div>
  );
}
