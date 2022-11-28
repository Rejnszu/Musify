import React from "react";
import styles from "./SongDetails.module.css";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import AnimatedPages from "../UI/FramerGenerals/AnimatedPages";
import EmptyList from "../UI/utils/EmptyList";
import Button from "../UI/utils/Button";
import useFetchMusic from "../../hooks/useFetchMusic";
const SongDetails = () => {
  const history = useHistory();

  const fetchMusic = useFetchMusic();
  const songsList = useSelector((state) => state.songsList.songsList);
  const { songId } = useParams();

  const song = songsList.find((song) => song.id === Number(songId));
  if (!song) {
    return (
      <EmptyList>
        Song doesnt Exist
        <Button styles={styles["button--404"]} onClick={() => history.goBack()}>
          Go back
        </Button>
      </EmptyList>
    );
  }
  return (
    <AnimatedPages>
      {/* <img src={} */}
      <h2>{song.title}</h2>
      <p>{song.author}</p>
      <button onClick={() => history.goBack()}>Go back</button>
    </AnimatedPages>
  );
};

export default SongDetails;
