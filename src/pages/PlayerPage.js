import React from "react";
import AnimatedPages from "../components/UI/AnimatedPages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../redux/auth-slice";
import styles from "./PlayerPage.module.css";
import Player from "../components/Player/Player";
import { fetchPlaylists } from "../Actions/playlistActions";
import SelectPlaylistToPlay from "../components/Player/SelectPlaylistToPlay";

export default function PlayerPage(props) {
  const dispatch = useDispatch();
  const selectedPlaylist = useSelector((state) => state.player.songList);
  const currentSong = useSelector((state) => state.player.currentSong);

  const currentUser = sessionStorage.getItem("currentUser");
  const initialFetchPlaylists = useSelector(
    (state) => state.authentication.initials.initialFetchPlaylists
  );

  useEffect(() => {
    if (initialFetchPlaylists) {
      dispatch(fetchPlaylists(currentUser));

      dispatch(authActions.handleInitialFetchPlaylists(false));

      return;
    }
  }, [dispatch, currentUser, initialFetchPlaylists]);
  return (
    <AnimatedPages>
      <SelectPlaylistToPlay />
      <div className={styles["player__overlay"]}>
        {currentSong !== undefined &&
          selectedPlaylist !== undefined &&
          selectedPlaylist !== "none" && (
            <Player isMobile={props.isMobile} playlist={selectedPlaylist} />
          )}
      </div>
    </AnimatedPages>
  );
}
