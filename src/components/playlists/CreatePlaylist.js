import React, { useRef } from "react";
import styles from "./CreatePlaylist.module.css";
import { useDispatch } from "react-redux/es/exports";
import { updateActions } from "../../redux/update-slice";
import { playlistActions } from "../../redux/playlist-slice";
import Button from "../UI/Button";

export default function CreatePlaylist() {
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
