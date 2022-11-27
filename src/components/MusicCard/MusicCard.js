import React, { useState } from "react";
import styles from "./MusicCard.module.css";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { songsActions } from "../../redux/songsList-slice";
import { updateActions } from "../../redux/update-slice";
import AreYouSureModal from "../UI/AreYouSureModal";
import Button from "../UI/Button";

export default function MusicCard(props) {
  const { url } = useRouteMatch();
  const songsList = useSelector((state) => state.songsList.songsList);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const addSong = () => {
    props.openModal();
    const song = songsList.find((song) => song.id === props.id);
    dispatch(songsActions.selectSongAddToPlaylist(song));
    dispatch(updateActions.shouldUpdate());
  };
  function removeSong() {
    dispatch(songsActions.removeSongFromList(props.id));
    dispatch(updateActions.shouldUpdate());
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
        onClick={() => setIsModalVisible(true)}
        styles={styles["button--song-card-close"]}
        type={"button"}
      >
        <i className="bi bi-x-lg"></i>
      </Button>
      {/* More detailed informations for each song coming soon */}
      {/* <Link to={`${url}/${props.id}`}>Check more</Link> */}
      {isModalVisible && (
        <AreYouSureModal
          removeItem={removeSong}
          closeModal={() => setIsModalVisible(false)}
          text="Are you sure you want delete song?"
        />
      )}
    </div>
  );
}
