import React, { useState } from "react";
import styles from "./MusicCard.module.css";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { playlistActions } from "../../redux/playlist-slice";
import { songsActions } from "../../redux/songsList-slice";

export default function MusicCard(props) {
  const songsList = useSelector((state) => state.songsList.songsList);

  const [isInPlaylist, setIsInPlaylist] = useState(false);

  const dispatch = useDispatch();
  const addSong = () => {
    dispatch(playlistActions.openModal());
    const song = songsList.find((song) => song.title === props.title);
    dispatch(songsActions.selectSongAddToPlaylist(song));
    // setIsInPlaylist(true);

    // dispatch(playlistActions.addSongToPlaylist(song));
  };

  return (
    <div className={styles["music-card"]}>
      <img src={props.img} alt={props.id} />
      <p className={styles["music-card__title"]}>Title: {props.title}</p>
      <p className={styles["music-card__author"]}>Author: {props.author}</p>
      <p className={styles["music-card__album"]}>Album: {props.album}</p>
      {isInPlaylist && (
        <p className={styles["music-card__badge"]}>
          <i className="bi bi-bookmark-check"></i>
        </p>
      )}
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
