import React, { useState } from "react";
import styles from "./ChooseFilters.module.css";
import SongFilter from "./SongFilter";
import FilterBygenre from "./FilterByGenre";
import Button from "../UI/Button";
function ChooseFilters(props) {
  const [choosenFilter, setChoosenFilter] = useState("name");
  const chooseFilterHandler = (e) => {
    setChoosenFilter(e.target.textContent);
    props.reset();
  };

  const filterTitleStyles = {
    textAlign: "center",
    fontSize: "clamp(0.7rem,4vw,1.5rem)",
    textTransform: "uppercase",
    fontWeight: 800,
    marginTop: "3rem",
  };

  return (
    <React.Fragment>
      <div style={filterTitleStyles}>
        Search for song by <br />
        <Button
          onClick={chooseFilterHandler}
          styles={`${
            styles["choose-filter__button"]
          } ${"button--black-box-shadow"}`}
        >
          name
        </Button>{" "}
        /
        <Button
          onClick={chooseFilterHandler}
          styles={`${
            styles["choose-filter__button"]
          } ${"button--black-box-shadow"}`}
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
