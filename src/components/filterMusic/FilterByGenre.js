import React from "react";
import { useSelector } from "react-redux";
import styles from "./FilterByGenre.module.css";

export default function FilterByGenre({ setFilteredSongs, songsList }) {
  function filterByGenre(e) {
    if (e.target.value === "all") {
      setFilteredSongs(songsList);
    } else
      setFilteredSongs(
        songsList.filter((song) => song.genre.toLowerCase() === e.target.value)
      );
  }

  const genreOptions = useSelector((state) => state.songsList.genreOptions);
  return (
    <div className={styles["filter-by-genre"]}>
      <select onChange={filterByGenre} name="genre" id="genre">
        {genreOptions.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
