import React, { useState } from "react";
import styles from "./ChooseFilters.module.css";
import SongFilter from "./SongFilter";
import FilterBygenre from "./FilterByGenre";
import Button from "../UI/Button";
function ChooseFilters(props) {
  const [choosenFilter, setChoosenFilter] = useState("name");
  const chooseFilterHandler = (e) => {
    setChoosenFilter(e.target.textContent);
  };
  return (
    <React.Fragment>
      <div className={styles["choose-filter__title"]}>
        Search for song by <br />
        <Button
          onClick={chooseFilterHandler}
          styles={styles["choose-filter__button"]}
        >
          name
        </Button>{" "}
        /
        <Button
          onClick={chooseFilterHandler}
          styles={styles["choose-filter__button"]}
        >
          genre
        </Button>
      </div>
      <div>
        {choosenFilter === "name" && (
          <SongFilter filterSongsByName={props.filterSongsByName} />
        )}
        {choosenFilter === "genre" && (
          <FilterBygenre filterSongsByGenre={props.filterSongsByGenre} />
        )}
      </div>
      ;
    </React.Fragment>
  );
}

export default ChooseFilters;
