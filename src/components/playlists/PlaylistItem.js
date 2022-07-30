import React from "react";
import Button from "../UI/Button";
import styles from "./PlaylistItem.module.css";
import { playlistActions } from "../../redux/playlist-slice";
import { useDispatch } from "react-redux/es/exports";

export default function PlaylistItem(props) {
  const dispatch = useDispatch();
  const removeSong = () => {
    dispatch(playlistActions.removeSongFromPlaylist(props.title));
  };
  return (
    <li className={styles["list-item"]}>
      <p>{props.title}</p>
      <div className={styles["button-wrapper"]}>
        <Button onClick={removeSong}>
          <i className="bi bi-trash"></i>
        </Button>
      </div>
    </li>
  );
}
