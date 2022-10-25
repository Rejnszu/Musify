import React from "react";
import styles from "./SongFilter.module.css";
export default function SongFilter(props) {
  function filterSongs(e) {
    props.filterSongsByName(e.target.value.toLowerCase());
  }

  return (
    <div className={styles["filter-form"]}>
      <input onInput={filterSongs} id="songFilter"></input>
    </div>
  );
}
