import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../../redux/player-slice";
import styles from "./SelectPlaylistToPlay.module.css";
import defaultMp3 from "../../mp3/coldplay.mp3";
export default function SelectPlaylistToPlay(props) {
  const playlists = useSelector((state) => state.playlist.playlists);
  const currentSong = useSelector((state) => state.player.currentSong);
  const songIndex = useSelector((state) => state.player.songIndex);
  const songList = useSelector((state) => state.player.songList);
  const dispatch = useDispatch();
  const [notEmptyPlaylist, setNotEmptyPlaylist] = useState(null);
  const audio = useSelector((state) => state.player.audio);

  function selectPlaylistHandler(e) {
    if (audio !== undefined) {
      audio.pause();
    }
    if (e.target.value === "none") {
      dispatch(playerActions.setSongList("none"));
      dispatch(playerActions.playerReset());
      return;
    }
    dispatch(playerActions.playerReset());

    const selectedPlaylist = playlists.find(
      (playlist) => playlist.id.toString() === e.target.value
    );

    dispatch(playerActions.setSongList(selectedPlaylist));
  }

  useEffect(() => {
    dispatch(playerActions.setCurrentSong(songList?.items[songIndex]));

    dispatch(
      playerActions.setAudio(
        new Audio(
          currentSong?.mp3Name
            ? require(`../../mp3/${currentSong?.mp3Name}.mp3`)
            : defaultMp3
        )
      )
    );
  }, [songList]);

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
