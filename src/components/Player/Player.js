import React, { useEffect, useRef } from "react";
import styles from "./Player.module.css";
import { useState } from "react";
import defaultMp3 from "../../mp3/coldplay.mp3";
let playInterval;
let songIndex = 0;
export default function Player(props) {
  const songList = props.playlist.items;
  // let currentSong = songList[songIndex];

  const [currentSong, setCurrentSong] = useState(songList[songIndex]);
  const [audio, setAudio] = useState(
    new Audio(
      currentSong.mp3Name
        ? require(`../../mp3/${currentSong.mp3Name}.mp3`)
        : defaultMp3
    )
  );

  const [timeLeft, setTimeLeft] = useState(Math.floor(audio.duration));
  const [timePassed, setTimePassed] = useState(0);
  const [showTimeLeft, setShowTimeLeft] = useState(false);

  const [progessBarWidth, setProgessBarWidth] = useState(0);
  const [musicBarWidth, setMusicBarWidth] = useState((audio.volume / 1) * 100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRandomSong, setIsRandomSong] = useState(false);
  let prevAudioRef = useRef(null);
  function timeFormatter(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;
  }
  function randomSongIndex() {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * songList.length);
    } while (randomNumber === songIndex);
    songIndex = randomNumber;
  }

  const nextSong = () => {
    slightReset();

    if (isRandomSong) {
      randomSongIndex();
    } else {
      if (songIndex < songList.length - 1) {
        songIndex = songIndex + 1;
      } else {
        songIndex = 0;
      }
    }
    setCurrentSong(songList[songIndex]);
  };
  const previousSong = () => {
    slightReset();

    if (isRandomSong) {
      randomSongIndex();
    } else {
      if (songIndex > 0) {
        songIndex = songIndex - 1;
      } else {
        songIndex = songList.length - 1;
      }
    }
    setCurrentSong(songList[songIndex]);
  };

  const fullReset = () => {
    songIndex = 0;
    setCurrentSong(songList[songIndex]);
    setIsRandomSong(false);
    clearInterval(playInterval);
    setProgessBarWidth(0);
    setTimeLeft(Math.floor(audio.duration));
    setTimePassed(0);
    setIsPlaying(false);
    setShowTimeLeft(false);

    audio.currentTime = 0;
  };
  const slightReset = () => {
    clearInterval(playInterval);
    setProgessBarWidth(0);
    setTimeLeft(Math.floor(audio.duration));
    setTimePassed(0);
    setShowTimeLeft(false);
    audio.currentTime = 0;
  };

  function playSong() {
    if (audio.duration - audio.currentTime === 0) {
      nextSong();
    } else {
      setTimePassed(Math.round(audio.currentTime));
      setTimeLeft(Math.floor(audio.duration - audio.currentTime));
    }
  }
  function changeSong() {
    audio.pause();

    setAudio(
      new Audio(
        currentSong.mp3Name
          ? require(`../../mp3/${currentSong.mp3Name}.mp3`)
          : defaultMp3
      )
    );
    audio.load();
  }
  const isPlayingHandler = (e) => {
    const currentTarget = e.currentTarget;
    currentTarget.classList.add(`${styles.ripple}`);
    setTimeout(() => currentTarget.classList.remove(`${styles.ripple}`), 300);
    setIsPlaying((prevState) => !prevState);
  };

  function setSongPlayTime(e) {
    const progress =
      (e.clientX - e.target.getBoundingClientRect().left) /
      e.currentTarget.offsetWidth;
    setProgessBarWidth(progress * 100);

    audio.currentTime = Math.floor(audio.duration * progress);
    setTimePassed(Math.round(audio.currentTime));
    setTimeLeft(Math.floor(audio.duration - audio.currentTime));
  }

  function setMusicVolume(e) {
    const progress =
      (e.clientX - e.target.getBoundingClientRect().left) /
      e.currentTarget.offsetWidth;
    setMusicBarWidth(progress * 100);

    audio.volume = progress;
  }

  // useEffect(() => {
  //   return () => {
  //     fullReset();
  //     props.stopAudio(prevAudioRef.current);
  //   };
  // }, [songList]);

  useEffect(() => {
    setProgessBarWidth((timePassed / audio.duration) * 100);
  }, [timePassed]);

  useEffect(() => {
    if (!audio.paused) {
      audio.play().then(() => {
        changeSong();
      });
    } else {
      changeSong();
    }
  }, [currentSong]);

  useEffect(() => {
    if (isPlaying) {
      audio.load();
      audio.play();
      clearInterval(playInterval);
      playInterval = setInterval(playSong, 1000);
      setTimeout(() => {
        setShowTimeLeft(true);
      }, 1000);
    } else {
      clearInterval(playInterval);
      audio.pause();
    }
    prevAudioRef.current = audio;
  }, [audio, isPlaying]);

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
        {showTimeLeft && (
          <span className={styles["player__progress-bar__left"]}>
            {timeFormatter(timeLeft)}
          </span>
        )}
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
        <button
          onClick={() => {
            previousSong();
          }}
          className={styles["player__buttons"]}
        >
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
        <button
          onClick={() => {
            nextSong();
          }}
          className={styles["player__buttons"]}
        >
          <i className="fa-sharp fa-solid fa-forward"></i>
        </button>
        <button
          onClick={(e) => {
            e.currentTarget.classList.toggle(`${styles.active}`);
          }}
          className={`${styles["player__buttons"]} ${styles["player__buttons--small"]}`}
        >
          <i className="fa-solid fa-repeat"></i>
        </button>
      </div>
      {!props.isMobile && (
        <div className={styles["player__volume-wrapper"]}>
          <button
            onClick={() => {
              if (audio.volume > 0) {
                if (audio.volume < 0.1) {
                  audio.volume = 0;
                } else {
                  audio.volume = Math.floor((audio.volume - 0.1) * 10) / 10;
                }
                setMusicBarWidth((audio.volume / 1) * 100);
              }
            }}
            className={styles["player__buttons"]}
          >
            {audio.volume === 0 ? (
              <i className="bi bi-volume-mute"></i>
            ) : (
              <i className="bi bi-volume-down"></i>
            )}
          </button>
          <div
            onClick={setMusicVolume}
            className={styles["player__volume-bar"]}
          >
            <span
              style={{ width: `${musicBarWidth + "%"}` }}
              className={styles["player__volume-bar__filling"]}
            ></span>
          </div>
          <button
            onClick={() => {
              if (audio.volume < 1) {
                if (audio.volume > 0.9) {
                  audio.volume = 1;
                } else {
                  audio.volume = Math.ceil((audio.volume + 0.1) * 10) / 10;
                }
                setMusicBarWidth((audio.volume / 1) * 100);
              }
            }}
            className={styles["player__buttons"]}
          >
            <i className="bi bi-volume-up"></i>
          </button>
        </div>
      )}
    </div>
  );
}
