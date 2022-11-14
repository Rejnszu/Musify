import React, { useState } from "react";
import styles from "./MusicCard.module.css";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { playlistActions } from "../../redux/playlist-slice";
import { songsActions } from "../../redux/songsList-slice";
import AreYouSureModal from "../UI/AreYouSureModal";
import { updateActions } from "../../redux/update-slice";

export default function MusicCard(props) {
  const songsList = useSelector((state) => state.songsList.songsList);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const addSong = () => {
    dispatch(playlistActions.openModal());
    const song = songsList.find((song) => song.id === props.id);
    dispatch(songsActions.selectSongAddToPlaylist(song));
    dispatch(updateActions.shouldUpdate());
  };
  function removeSong() {
    dispatch(songsActions.removeSongFromList(props.id));
    dispatch(updateActions.shouldUpdate());
  }
  function openModal() {
    setIsModalVisible(true);
  }
  function closeModal() {
    setIsModalVisible(false);
  }

  return (
    <div className={styles["music-card"]}>
      <img src={props.img} alt={props.title} />
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

      <Button
        onClick={openModal}
        styles={styles["button--song-card-close"]}
        type={"button"}
      >
        <i className="bi bi-x-lg"></i>
      </Button>
      {isModalVisible && (
        <AreYouSureModal
          removeItem={removeSong}
          closeModal={closeModal}
          text="Are you sure you want delete song?"
        />
      )}
    </div>
  );
}
