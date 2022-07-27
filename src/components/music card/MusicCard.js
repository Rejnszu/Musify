import React from "react";
import styles from "./MusicCard.module.css";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { playlistActions } from "../../redux/playlist-slice";

export default function MusicCard(props) {
  const songsList = useSelector((state) => state.songsList.songsList);
  const playlist = useSelector((state) => state.playlist.playlist);

  const dispatch = useDispatch();
  const addSong = () => {
    const song = songsList.find((song) => song.title === props.title);
    if (playlist.includes(song)) {
      return;
    } else {
      dispatch(playlistActions.addSongToPlaylist(song));
    }
  };

  return (
    <div className={styles["music-card"]}>
      <img src={props.img} alt={props.id} />
      <p className={styles["music-card__title"]}>Title: {props.title}</p>
      <p className={styles["music-card__author"]}>Author: {props.author}</p>
      <p className={styles["music-card__album"]}>Album: {props.album}</p>
      <Button
        type={"button"}
        styles={styles["button--music-card"]}
        onClick={addSong}
      >
        Add to Playlist <i className="bi bi-music-note-list"></i>
      </Button>
    </div>
  );
}
