import React, { useState } from "react";
import styles from "./MusicCard.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { songsActions } from "../../redux/songsList-slice";
import { updateActions } from "../../redux/update-slice";
import AreYouSureModal from "../UI/utils/AreYouSureModal";
import Button from "../UI/utils/Button";
import useMobile from "../../hooks/useMobile";

export default function MusicCard(props) {
  const isMobile = useMobile(1200);
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
      <p className={styles["music-card__title"]}>{props.title}</p>
      <p className={styles["music-card__author"]}>{props.author}</p>

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
      {isMobile ? (
        <Link to={`${props.id}`} className={styles["more-info__mobile"]}>
          <i className="bi bi-info-circle"></i>
        </Link>
      ) : (
        <Link className={styles["more-info__desktop"]} to={`${props.id}`}>
          More informations
        </Link>
      )}
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
