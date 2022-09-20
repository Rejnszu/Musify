import React, { useEffect } from "react";
import styles from "./Player.module.css";
import { useState } from "react";

export default function Player(props) {
  const [songNumber, setSongNumber] = useState(0);
  const [isRandomSong, setIsRandomSong] = useState(false);
  const songList = props.playlist.items;
  const currentSong = songList[songNumber];

  const nextSong = () => {
    if (isRandomSong) {
      setSongNumber((prevState) => {
        let randomNumber;
        do {
          randomNumber = Math.floor(Math.random() * songList.length);
        } while (randomNumber === prevState);
        return randomNumber;
      });

      return;
    }
    if (songNumber < songList.length - 1) {
      setSongNumber((prevState) => prevState + 1);
    } else {
      setSongNumber(0);
    }
  };
  const previousSong = () => {
    if (isRandomSong) {
      setSongNumber((prevState) => {
        let randomNumber;
        do {
          randomNumber = Math.floor(Math.random() * songList.length);
        } while (randomNumber === prevState);
        return randomNumber;
      });

      return;
    }
    if (songNumber > 0) {
      setSongNumber((prevState) => prevState - 1);
    } else {
      setSongNumber(songList.length - 1);
    }
  };

  const toggleButtonActiveStyle = (e) => {
    e.currentTarget.classList.toggle(`${styles.active}`);
  };
  const randomHandler = () => {
    setIsRandomSong((prevState) => !prevState);
  };
  useEffect(() => {
    setSongNumber(0);
  }, [songList]);
  return (
    <div className={styles.player}>
      <img
        className={styles["player__album-cover"]}
        src={currentSong?.img}
        alt="album-cover"
      ></img>
      <p className={styles["player__song-title"]}>{currentSong?.title}</p>
      <p className={styles["player__song-artist"]}>{currentSong?.author}</p>
      <div className={styles["player__song-duration"]}>
        <span className={styles["player__song-duration__current"]}>1:27</span>
        <span className={styles["player__song-duration__left"]}>2:15</span>
      </div>
      <div className={styles["player__buttons-wrapper"]}>
        <button
          onClick={(e) => {
            toggleButtonActiveStyle(e);
            randomHandler();
          }}
          className={`${styles["player__buttons"]} ${styles["player__buttons--small"]}`}
        >
          <i className="fa-solid fa-shuffle"></i>
        </button>
        <button onClick={previousSong} className={styles["player__buttons"]}>
          <i className="fa-sharp fa-solid fa-backward"></i>
        </button>
        <button
          className={`${styles["player__buttons"]} ${styles["player__buttons--main"]}`}
        >
          <i className="bi bi-play-fill"></i>
        </button>
        <button onClick={nextSong} className={styles["player__buttons"]}>
          <i className="fa-sharp fa-solid fa-forward"></i>
        </button>
        <button
          onClick={toggleButtonActiveStyle}
          className={`${styles["player__buttons"]} ${styles["player__buttons--small"]}`}
        >
          <i className="fa-solid fa-repeat"></i>
        </button>
      </div>
    </div>
  );
}
