import React from "react";
import styles from "./SongDetails.module.css";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSongDuration } from "../../hooks/useSongDuration";
import defaultMp3 from "../../assets/mp3/coldplay.mp3";

import AnimatedSwipe from "../UI/FramerGenerals/AnimatedSwipe";
import EmptyList from "../UI/utils/EmptyList";
import Button from "../UI/utils/Button";
import useFetchMusic from "../../hooks/useFetchMusic";
import Swiper from "../UI/Layout/Swiper";

const SongDetails = () => {
  const navigate = useNavigate();
  const fetchMusic = useFetchMusic();
  const songsList = useSelector((state) => state.songsList.songsList);
  const { songId } = useParams();

  const song = songsList.find((song) => song.id === Number(songId));

  const currentIndex = songsList.indexOf(song);
  const nextSong = songsList[currentIndex + 1];
  const prevSong = songsList[currentIndex - 1];

  const nextSongPush = `/songs/${nextSong?.id ? nextSong.id : songsList[0].id}`;
  const prevSongPush = `/songs/${
    prevSong?.id ? prevSong.id : songsList[songsList.length - 1].id
  }`;
  const duration = useSongDuration(
    song?.mp3Name
      ? require(`../../assets/mp3/${song?.mp3Name}.mp3`)
      : defaultMp3
  );

  const showNextSong = () => {
    navigate(nextSongPush);
  };
  const showPreviousSong = () => {
    navigate(prevSongPush);
  };

  if (!song) {
    return (
      <EmptyList>
        Song doesnt Exist
        <Button
          styles={styles["button--404"]}
          onClick={() => navigate("/songs")}
        >
          Go back
        </Button>
      </EmptyList>
    );
  }

  return (
    <Swiper
      actionLeft={() => showNextSong()}
      actionRight={() => showPreviousSong()}
    >
      <Link
        className={`${styles["scroll-button"]} ${styles["scroll-button--right"]}`}
        to={nextSongPush}
      >
        <i className="bi bi-caret-right-fill"></i>
      </Link>
      <Link
        className={`${styles["scroll-button"]} ${styles["scroll-button--left"]}`}
        to={prevSongPush}
      >
        <i className="bi bi-caret-left-fill"></i>
      </Link>
      <AnimatedSwipe>
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
              <span>Genre:</span> {song.genre}
            </p>
            <p className={styles["description__item"]}>
              <span>Duration:</span> {duration}
            </p>
          </div>
        </div>
      </AnimatedSwipe>
      <Button onClick={() => navigate("/songs")}>Go back</Button>
    </Swiper>
  );
};

export default SongDetails;
