import React, { useEffect } from "react";
import AnimatedPages from "../components/UI/AnimatedPages";
import SelectPlaylistToPlay from "../components/Player/SelectPlaylistToPlay";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylists } from "../Actions/playlistActions";
import { authActions } from "../redux/auth-slice";
import styles from "./PlayerPage.module.css";
import Player from "../components/Player/Player";

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
      <main>
        <SelectPlaylistToPlay />
        <div className={styles["player__overlay"]}>
          {currentSong !== undefined &&
            selectedPlaylist !== undefined &&
            selectedPlaylist !== "none" && (
              <Player isMobile={props.isMobile} playlist={selectedPlaylist} />
            )}
        </div>
      </main>
    </AnimatedPages>
  );
}
