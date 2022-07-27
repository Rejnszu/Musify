import React from "react";
import styles from "./Playlists.module.css";
import { useSelector } from "react-redux";
export default function Playlists() {
  const playlist = useSelector((state) => state.playlist.playlist);

  return (
    <div className={styles.playlist}>
      <p className={styles["playlist__title"]}>PlayListName</p>
      <ul className={styles["playlist__list"]}>
        {playlist.map((song, i) => {
          return <li key={i}>{song.title}</li>;
        })}
      </ul>
    </div>
  );
}
