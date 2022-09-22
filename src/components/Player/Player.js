import React, { useEffect, useRef } from "react";
import styles from "./Player.module.css";
import { useState } from "react";

let playInterval;

export default function Player(props) {
  const [songNumber, setSongNumber] = useState(0);
  const [audio, setAudio] = useState(props.audio);

  const [timeLeft, setTimeLeft] = useState(Math.floor(audio.duration));
  const [timePassed, setTimePassed] = useState(0);

  const [progessBarWidth, setProgessBarWidth] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRandomSong, setIsRandomSong] = useState(false);

  const songList = props.playlist.items;
  const currentSong = songList[songNumber];

  function timeFormatter(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;
  }

  const nextSong = () => {
    slightReset();
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
    slightReset();
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

  const fullReset = () => {
    clearInterval(playInterval);
    setProgessBarWidth(0);
    setTimeLeft(Math.floor(audio.duration));
    setTimePassed(0);
    setIsPlaying(false);
    audio.pause();
    audio.currentTime = 0;
  };
  const slightReset = () => {
    clearInterval(playInterval);
    setProgessBarWidth(0);
    setTimeLeft(Math.floor(audio.duration));
    setTimePassed(0);
    audio.currentTime = 0;
  };
  function play() {
    if (!isPlaying) {
      clearInterval(playInterval);
      audio.play();
      playInterval = setInterval(playSong, 1000);
    } else {
      clearInterval(playInterval);
      audio.pause();
    }
  }

  function playSong() {
    if (audio.duration - audio.currentTime === 0) {
      nextSong();
      play();
    } else {
      setTimeLeft((prevState) => prevState - 1);
      setTimePassed((prevState) => prevState + 1);
    }
  }
  const isPlayingHandler = (e) => {
    const currentTarget = e.currentTarget;
    currentTarget.classList.add(`${styles.ripple}`);

    setTimeout(() => currentTarget.classList.remove(`${styles.ripple}`), 300);
    setIsPlaying((prevState) => !prevState);
    play();
  };
  function setSongPlayTime(e) {
    const progress =
      (e.clientX - e.target.getBoundingClientRect().left) /
      e.currentTarget.offsetWidth;
    setProgessBarWidth(progress * 100);

    audio.currentTime = Math.floor(audio.duration * progress);
    setTimePassed(audio.currentTime);
    setTimeLeft(Math.floor(audio.duration - audio.currentTime));
  }
  useEffect(() => {
    setSongNumber(0);
    setIsRandomSong(false);
    fullReset();
    return () => {
      fullReset();
    };
  }, [songList]);

  useEffect(() => {
    setProgessBarWidth((timePassed / audio.duration) * 100);
  }, [timePassed]);

  return (
    <div className={styles.player}>
      <img
        className={styles["player__album-cover"]}
        src={currentSong?.img}
        alt="album-cover"
      ></img>
      <p className={styles["player__song-title"]}>{currentSong?.title}</p>
      <p className={styles["player__song-artist"]}>{currentSong?.author}</p>
      <div onClick={setSongPlayTime} className={styles["player__progress-bar"]}>
        <span
          style={{ width: `${progessBarWidth + "%"}` }}
          className={styles["player__progress-bar__filling"]}
        ></span>
        <span className={styles["player__progress-bar__current"]}>
          {timeFormatter(timePassed)}
        </span>
        <span className={styles["player__progress-bar__left"]}>
          {timeFormatter(timeLeft)}
        </span>
      </div>
      <div className={styles["player__buttons-wrapper"]}>
        <button
          onClick={(e) => {
            songList.length > 1 && setIsRandomSong((prevState) => !prevState);
          }}
          className={`${styles["player__buttons"]} ${
            styles["player__buttons--small"]
          } ${isRandomSong && styles["active"]}`}
        >
          <i className="fa-solid fa-shuffle"></i>
        </button>
        <button onClick={previousSong} className={styles["player__buttons"]}>
          <i className="fa-sharp fa-solid fa-backward"></i>
        </button>
        <button
          onClick={isPlayingHandler}
          className={`${styles["player__buttons"]} ${styles["player__buttons--main"]}`}
        >
          {isPlaying ? (
            <i className="bi bi-pause-fill"></i>
          ) : (
            <i className="bi bi-play-fill"></i>
          )}
        </button>
        <button onClick={nextSong} className={styles["player__buttons"]}>
          <i className="fa-sharp fa-solid fa-forward"></i>
        </button>
        <button
          onClick={(e) => e.currentTarget.classList.toggle(`${styles.active}`)}
          className={`${styles["player__buttons"]} ${styles["player__buttons--small"]}`}
        >
          <i className="fa-solid fa-repeat"></i>
        </button>
      </div>
    </div>
  );
}
