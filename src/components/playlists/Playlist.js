import React from "react";
import styles from "./Playlist.module.css";
import { useSelector, useDispatch } from "react-redux";
import PlaylistItem from "./PlaylistItem";
import { playlistActions } from "../../redux/playlist-slice";
import Button from "../UI/Button";
export default function Playlist(props) {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist.playlist);
  const removePlaylist = () => {
    dispatch(playlistActions.removePlaylist(props.id));
  };
  return (
    <React.Fragment>
      <div className={styles.playlist}>
        <p className={styles["playlist__title"]}>{props.name}</p>
        <ul className={styles["playlist__list"]}></ul>
        <Button
          onClick={removePlaylist}
          styles={styles["button--playlist-close"]}
          type={"button"}
        >
          <i class="bi bi-x-lg"></i>
        </Button>
      </div>
    </React.Fragment>
  );
}
