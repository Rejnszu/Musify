import React from "react";
import AnimatedPages from "./FramerGenerals/AnimatedPages";
import Button from "./utils/Button";
import styles from "./ChangeSongDisplay.module.scss";
import { useDispatch } from "react-redux";
import { songsActions } from "../../redux/songsList-slice";
export default function ChangeSongsDisplay() {
  const dispatch = useDispatch();
  return (
    <AnimatedPages>
      <div className={styles["card-display"]}>
        <Button styles={styles["button--card-display"]}>
          <i className="bi bi-file-music" />
          <div className={styles["display__select"]}>
            <p
              onClick={() =>
                dispatch(
                  songsActions.setSongsLayout({
                    display: "cards",
                    direction: "horizontal",
                  })
                )
              }
            >
              <i className="bi bi-grip-horizontal"></i>
            </p>
            <p
              onClick={() =>
                dispatch(
                  songsActions.setSongsLayout({
                    display: "cards",
                    direction: "vertical",
                  })
                )
              }
            >
              <i className="bi bi-grip-vertical"></i>
            </p>
          </div>
        </Button>

        <Button
          onClick={() =>
            dispatch(songsActions.setSongsLayout({ display: "list" }))
          }
          styles={styles["button--card-display"]}
        >
          <i className="bi bi-list" />
        </Button>
      </div>
    </AnimatedPages>
  );
}
