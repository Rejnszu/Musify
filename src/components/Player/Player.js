import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Player.module.css";
import { playerActions } from "../../redux/player-slice";
import defaultMp3 from "../../assets/mp3/coldplay.mp3";
import useMobile from "../../hooks/useMobile";

export default function Player() {
  const isMobile = useMobile(1300);
  const initialPageLoad = useSelector(
    (state) => state.player.initialPlayerLoad
  );

  const dispatch = useDispatch();
  const {
    playInterval,
    songList,
    songIndex,
    audio,
    isPlaying,
    isRandomSong,
    currentSong,
  } = useSelector((state) => state.player);

  const [timeLeft, setTimeLeft] = useState(Math.floor(audio.duration));
  const [timePassed, setTimePassed] = useState(0);
  const [showTimeLeft, setShowTimeLeft] = useState(false);

  const [progessBarWidth, setProgessBarWidth] = useState(0);
  const [musicBarWidth, setMusicBarWidth] = useState((audio.volume / 1) * 100);

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
      randomNumber = Math.floor(Math.random() * songList.items.length);
    } while (randomNumber === songIndex);
    dispatch(playerActions.setSongIndex(randomNumber));
  }

  const slightReset = () => {
    clearInterval(playInterval);
    setProgessBarWidth(0);
    setTimeLeft(Math.floor(audio.duration));
    setTimePassed(0);
    setShowTimeLeft(false);
    audio.currentTime = 0;
  };

  const nextSong = () => {
    slightReset();
    dispatch(playerActions.playerInitialLoadHandler(true));
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
    dispatch(playerActions.playerInitialLoadHandler(true));
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

  function playSong() {
    if (audio.duration - audio.currentTime === 0) {
      dispatch(playerActions.playerInitialLoadHandler(true));
      nextSong();
    } else {
      setTimePassed(Math.round(audio.currentTime));
      setTimeLeft(Math.floor(audio.duration - audio.currentTime));
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

  const isPlayingHandler = (e) => {
    const currentTarget = e.currentTarget;
    currentTarget.classList.add(`${styles.ripple}`);
    setTimeout(() => currentTarget.classList.remove(`${styles.ripple}`), 300);
    dispatch(playerActions.changeIsPlaying());
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

  useEffect(() => {
    setProgessBarWidth((timePassed / audio.duration) * 100);
  }, [timePassed]);

  useEffect(() => {
    dispatch(playerActions.setCurrentSong(songList.items[songIndex]));
  }, [songIndex]);

  useEffect(() => {
    if (initialPageLoad) {
      if (!audio.paused) {
        audio.play().then(() => {
          changeSong();
        });
      } else {
        changeSong();
      }
      dispatch(playerActions.playerInitialLoadHandler(false));
    }
  }, [currentSong]);

  useEffect(() => {
    if (isPlaying) {
      audio.play();
      clearInterval(playInterval);
      dispatch(playerActions.setPlayInterval(setInterval(playSong, 1000)));
      setTimeout(() => {
        setShowTimeLeft(true);
      }, 1000);
    } else {
      clearInterval(playInterval);
      audio.pause();
    }

    audio.volume = musicBarWidth / 100;
  }, [audio, isPlaying]);

  // Another place when all of sudden css styles stopped applying on gh-pages so I have to put them with style object, on local server everything works fine
  const playerStyle = {
    marginTop: "2rem",
    display: "flex",
    padding: "1.5rem 0.5rem",
    flexDirection: "column",
    width: "500px",
    alignItems: "center",
    maxWidth: "var(--max-width)",
    borderRadius: "var(--main-border-radius",
    backgroundColor: "var(--dimmed-background-black)",
    rowGap: "1rem",
    boxShadow: "var(--main-box-shadow)",
  };

  return (
    <div style={playerStyle}>
      <div className={styles["player__album-cover"]}>
        <img
          className={styles["album-cover__img"]}
          src={currentSong?.img}
          alt={currentSong?.title}
        />
      </div>
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
            songList.items.length > 1 &&
              dispatch(playerActions.setIsRandomSong());
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
      {!isMobile && (
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
