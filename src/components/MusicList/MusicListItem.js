import React, { useState } from "react";
import styles from "./MusicListItem.module.css";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { songsActions } from "../../redux/songsList-slice";
import { updateActions } from "../../redux/update-slice";
import AreYouSureModal from "../UI/utils/AreYouSureModal";
import Button from "../UI/utils/Button";

export default function MusicListItem(props) {
  const songsList = useSelector((state) => state.songsList.songsList);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { url } = useRouteMatch();

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
    <div className={styles["music-list-card"]}>
      <Button
        type={"button"}
        styles={styles["button--music-list-card"]}
        onClick={addSong}
      >
        <i className="bi bi-plus"></i>
      </Button>
      <Link
        to={`${url}/${props.id}`}
        className={styles["music-list-card__title"]}
      >
        {props.title}
      </Link>
      <Button
        onClick={() => setIsModalVisible(true)}
        styles={styles["button--song-card-close"]}
        type={"button"}
      >
        <i className="bi bi-x-lg"></i>
      </Button>
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
