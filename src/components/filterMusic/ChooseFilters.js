import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./ChooseFilters.module.css";
import FilterByName from "./FilterByName";
import FilterBygenre from "./FilterByGenre";
import Button from "../UI/utils/Button";

function ChooseFilters({ setFilteredSongs }) {
  const songsList = useSelector((state) => state.songsList.songsList);
  const [choosenFilter, setChoosenFilter] = useState("name");
  const chooseFilterHandler = (e) => {
    setChoosenFilter(e.target.textContent);
    setFilteredSongs(songsList);
  };
  useEffect(() => {
    setFilteredSongs(songsList);
  }, [songsList]);

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
        </Button>
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
          <FilterByName
            setFilteredSongs={setFilteredSongs}
            songsList={songsList}
          />
        )}
        {choosenFilter === "genre" && (
          <FilterBygenre
            setFilteredSongs={setFilteredSongs}
            songsList={songsList}
          />
        )}
      </div>
      ;
    </React.Fragment>
  );
}

export default ChooseFilters;
