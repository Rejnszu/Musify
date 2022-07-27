import React from "react";
import styles from "./SongFilter.module.css";
export default function SongFilter(props) {
  function filterSongs(e) {
    props.filterSongs(e.target.value.toLowerCase());
  }

  return (
    <div className={styles["filter-form"]}>
      <label htmlFor="songFilter">Search For Songs</label>
      <input onInput={filterSongs} id="songFilter"></input>
    </div>
  );
}
