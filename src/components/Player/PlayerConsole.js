import React from "react";
import styles from "./PlayerConsole.module.css";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../../redux/player-slice";
export default function PlayerConsole() {
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.player.currentSong);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  return (
    <div className="center-wrapper">
      <div className={styles["player__console-wrapper"]}>
        <marquee className={styles["player__song-title"]}>
          {currentSong.title}
        </marquee>
        <div className={styles["player__console__buttons-wrapper"]}>
          <button className={styles["player__buttons"]}>
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
          <button className={styles["player__buttons"]}>
            <i className="fa-sharp fa-solid fa-forward"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
