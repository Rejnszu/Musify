import React from "react";
import AnimatedPages from "./AnimatedPages";
import Button from "./Button";
import styles from "./ChangeSongDisplay.module.css";
export default function ChangeSongsDisplay(props) {
  return (
    <AnimatedPages>
      <div className={styles["card-display"]}>
        <Button
          onClick={props.setCards}
          styles={styles["button--card-display"]}
        >
          <i className="bi bi-file-music"></i>
        </Button>

        <Button onClick={props.setList} styles={styles["button--card-display"]}>
          <i className="bi bi-list"></i>
        </Button>
      </div>
    </AnimatedPages>
  );
}
