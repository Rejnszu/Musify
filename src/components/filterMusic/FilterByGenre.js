import React from "react";
import styles from "./FilterByGenre.module.css";
export default function FilterBy(props) {
  function filterByGenre(e) {
    props.filterSongsByGenre(e.target.value);
  }

  return (
    <div className={styles["filter-by-genre"]}>
      <select onChange={filterByGenre} name="genre" id="genre">
        <option value="all">All</option>
        <option value="rock">Rock</option>
        <option value="pop">Pop</option>
        <option value="rap">Rap</option>
      </select>
    </div>
  );
}
