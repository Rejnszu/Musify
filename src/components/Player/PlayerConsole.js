import React, { useEffect } from "react";
import styles from "./PlayerConsole.module.css";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../../redux/player-slice";

import Button from "../UI/utils/Button";
import defaultMp3 from "../../assets/mp3/coldplay.mp3";
let initialPageLoad = true;

export default function PlayerConsole() {
  const dispatch = useDispatch();
  const {
    currentSong,
    isPlaying,
    audio,
    isRandomSong,
    songIndex,
    songList,
    playInterval,
  } = useSelector((state) => state.player);

  function randomSongIndex() {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * songList.items.length);
    } while (randomNumber === songIndex);
    dispatch(playerActions.setSongIndex(randomNumber));
  }

  const nextSong = () => {
    slightReset();

    if (isRandomSong) {
      randomSongIndex();
    } else {
      if (songIndex < songList.items.length - 1) {
        dispatch(playerActions.increaseSongIndex());
      } else {
        dispatch(playerActions.setSongIndex(0));
      }
    }
  };
  const previousSong = () => {
    slightReset();

    if (isRandomSong) {
      randomSongIndex();
    } else {
      if (songIndex > 0) {
        dispatch(playerActions.reduceSongIndex());
      } else {
        dispatch(playerActions.setSongIndex(songList.items.length - 1));
      }
    }
  };

  const slightReset = () => {
    clearInterval(playInterval);
    audio.currentTime = 0;
  };

  function playSong() {
    if (audio.duration - audio.currentTime === 0) {
      nextSong();
    }
  }

  function changeSong() {
    audio.pause();

    dispatch(
      playerActions.setAudio(
        new Audio(
          currentSong.mp3Name
            ? require(`../../assets/mp3/${currentSong.mp3Name}.mp3`)
            : defaultMp3
        )
      )
    );

    audio.load();
  }

  useEffect(() => {
    dispatch(playerActions.setCurrentSong(songList.items[songIndex]));
  }, [songIndex]);

  useEffect(() => {
    if (initialPageLoad) {
      initialPageLoad = false;
      return;
    }
    if (!audio.paused) {
      audio.play().then(() => {
        changeSong();
      });
    } else {
      changeSong();
    }
  }, [currentSong]);

  useEffect(() => {
    return () => (initialPageLoad = true);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audio.play();
      clearInterval(playInterval);
      dispatch(playerActions.setPlayInterval(setInterval(playSong, 1000)));
    } else {
      clearInterval(playInterval);
      audio.pause();
    }
  }, [audio, isPlaying]);

  return (
    <div className="center-wrapper">
      <div className={styles["player__console-wrapper"]}>
        <Button
          styles={styles["button--play-reset"]}
          onClick={() => {
            if (audio) {
              audio.pause();
            }
            dispatch(playerActions.playerReset());
          }}
        >
          X
        </Button>
        <marquee className={styles["player__song-title"]}>
          {currentSong.title}
        </marquee>
        <div className={styles["player__console__buttons-wrapper"]}>
          <button onClick={previousSong} className={styles["player__buttons"]}>
            <i className="fa-sharp fa-solid fa-backward"></i>
          </button>
          <button
            onClick={() => dispatch(playerActions.changeIsPlaying())}
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
        </div>
      </div>
    </div>
  );
}
