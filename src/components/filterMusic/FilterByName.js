import React from "react";
import styles from "./FilterByName.module.css";

export default function SongFilter({ setFilteredSongs, songsList }) {
  function filterByName(e) {
    if (e.target.value.toLowerCase().trim().length === 0) {
      setFilteredSongs(songsList);
    } else {
      setFilteredSongs(
        songsList.filter(
          (song) =>
            song.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
            song.author.toLowerCase().includes(e.target.value.toLowerCase()) ||
            song.album.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  }

  return (
    <div className={styles["filter-form"]}>
      <input onInput={filterByName} id="songFilter"></input>
    </div>
  );
}
