import React from "react";
import styles from "./FilterByName.module.css";
let timer;
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

  function debounceFilter(e, delay = 400) {
    clearTimeout(timer);
    timer = setTimeout(() => filterByName(e), delay);
  }

  return (
    <div className={styles["filter-form"]}>
      <input onInput={debounceFilter} id="songFilter"></input>
    </div>
  );
}
