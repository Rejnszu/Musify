import React from "react";
import styles from "./SongDetails.module.css";
import { useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import AnimatedPages from "../UI/FramerGenerals/AnimatedPages";
import EmptyList from "../UI/utils/EmptyList";
import Button from "../UI/utils/Button";
import useFetchMusic from "../../hooks/useFetchMusic";
import Swiper from "../UI/Layout/Swiper";
const SongDetails = () => {
  const history = useHistory();
  const fetchMusic = useFetchMusic();
  const songsList = useSelector((state) => state.songsList.songsList);
  const { songId } = useParams();

  const song = songsList.find((song) => song.id === Number(songId));
  const currentIndex = songsList.indexOf(song);
  const nextSong = songsList[currentIndex + 1];
  const prevSong = songsList[currentIndex - 1];

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
      <Swiper
        actionLeft={() =>
          history.push(`${nextSong?.id ? nextSong.id : song.id}`)
        }
        actionRight={() =>
          history.push(`${prevSong?.id ? prevSong.id : song.id}`)
        }
      >
        <Link
          className={`${styles["scroll-button"]} ${styles["scroll-button--right"]}`}
          to={`${nextSong?.id ? nextSong.id : song.id}`}
        >
          <i className="bi bi-caret-right-fill"></i>
        </Link>
        <Link
          className={`${styles["scroll-button"]} ${styles["scroll-button--left"]}`}
          to={`${prevSong?.id ? prevSong.id : song.id}`}
        >
          <i className="bi bi-caret-left-fill"></i>
        </Link>
        <div className={styles["details"]}>
          <div className={styles["details__image"]}>
            <img src={song.img} alt={song.img} />
          </div>
          <div className={styles["details__description"]}>
            <h2 className={styles["description__title"]}>{song.title}</h2>
            <p className={styles["description__item"]}>
              <span>Author:</span> {song.author}
            </p>
            <p className={styles["description__item"]}>
              <span>Album:</span> {song.album}
            </p>
            <p className={styles["description__item"]}>
              <span>Genre</span>: {song.genre}
            </p>
          </div>
        </div>
        <Button onClick={() => history.goBack()}>Go back</Button>
      </Swiper>
    </AnimatedPages>
  );
};

export default SongDetails;
