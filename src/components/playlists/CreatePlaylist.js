import React from "react";
import styles from "./CreatePlaylist.module.css";
import { playlistActions } from "../../redux/playlist-slice";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/exports";
import { useRef } from "react";
import { updateActions } from "../../redux/update-slice";
import Button from "../UI/Button";
export default function CreatePlaylist() {
  const playLists = useSelector((state) => state.playlist.playlists);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const addPlaylist = (e) => {
    e.preventDefault();
    if (inputRef.current.value.length === 0) {
      return;
    } else {
      dispatch(playlistActions.addPlaylist(inputRef.current.value));
      inputRef.current.value = "";
    }
    dispatch(updateActions.shouldUpdate());
  };
  return (
    <form onSubmit={addPlaylist} className={styles["playlist-form"]}>
      <label>Create Playlist (name)</label>
      <input ref={inputRef} id="createPlaylist"></input>
      <Button styles="button--black-box-shadow" type={"submit"}>
        Add Playlist
      </Button>
    </form>
  );
}
