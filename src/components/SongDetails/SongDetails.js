import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AnimatedPages from "../UI/AnimatedPages";
import EmptyList from "../UI/EmptyList";
import useFetchMusic from "../../hooks/useFetchMusic";
const SongDetails = () => {
  const fetchMusic = useFetchMusic();
  const songsList = useSelector((state) => state.songsList.songsList);
  const { songId } = useParams();

  const song = songsList.find((song) => song.id === Number(songId));
  if (!song) {
    return <EmptyList>Song doesnt Exist</EmptyList>;
  }
  return (
    <AnimatedPages>
      <h1>{song.title}</h1>
      <p>{song.author}</p>
    </AnimatedPages>
  );
};

export default SongDetails;
