import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./SelectPlaylistToPlay.module.css";

export default function SelectPlaylistToPlay(props) {
  const playlists = useSelector((state) => state.playlist.playlists);
  const [notEmptyPlaylist, setNotEmptyPlaylist] = useState(null);

  function selectPlaylistHandler(e) {
    if (e.target.value === "none") {
      props.selectPlaylist("none");
      return;
    }
    const selectedPlaylist = playlists.find(
      (playlist) => playlist.id.toString() === e.target.value
    );

    props.selectPlaylist(selectedPlaylist);
  }
  useEffect(() => {
    setNotEmptyPlaylist(
      playlists.filter(
        (playlist) => playlist.items && playlist.items.length > 0
      )
    );
  }, [playlists]);
  return (
    <div className={styles["select-playlist"]}>
      <select onChange={selectPlaylistHandler} name="genre" id="genre">
        <option value="none">None</option>
        {notEmptyPlaylist?.map((playlist) => {
          return (
            <option key={playlist.id} value={playlist.id}>
              {playlist.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
