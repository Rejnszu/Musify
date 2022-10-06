import React from "react";
import { useSelector } from "react-redux";
import styles from "./FilterByGenre.module.css";
export default function FilterBy(props) {
  function filterByGenre(e) {
    props.filterSongsByGenre(e.target.value);
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
