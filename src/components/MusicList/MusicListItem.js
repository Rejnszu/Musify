import React, { useState } from "react";
import styles from "./MusicListItem.module.css";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { playlistActions } from "../../redux/playlist-slice";
import { songsActions } from "../../redux/songsList-slice";
import AreYouSureModal from "../UI/AreYouSureModal";
import MusicListItemOptions from "./MusicListItemOptions";
export default function MusicListItem(props) {
  const songsList = useSelector((state) => state.songsList.songsList);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const addSong = () => {
    dispatch(playlistActions.openModal());
    const song = songsList.find((song) => song.title === props.title);
    dispatch(songsActions.selectSongAddToPlaylist(song));
  };
  function removeSong() {
    dispatch(songsActions.removeSongFromList(props.id));
  }
  function openModal() {
    setIsModalVisible(true);
  }
  function closeModal() {
    setIsModalVisible(false);
  }

  return (
    <div className={styles["music-list-card"]}>
      <p className={styles["music-list-card__title"]}>{props.title}</p>
      <MusicListItemOptions />
      {/* <Button
        type={"button"}
        styles={styles["button--music-card"]}
        onClick={addSong}
      >
        Add to Playlist
        <i className="bi bi-music-note-list"></i>
      </Button>

      <Button
        onClick={openModal}
        styles={styles["button--song-card-close"]}
        type={"button"}
      >
        <i className="bi bi-x-lg"></i>
      </Button> */}
      {/* {isModalVisible && (
        <AreYouSureModal
          removeItem={removeSong}
          closeModal={closeModal}
          text="Are you sure you want delete song?"
        />
      )} */}
    </div>
  );
}
