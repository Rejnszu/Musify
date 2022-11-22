import React, { useEffect } from "react";
import AnimatedPages from "../components/UI/AnimatedPages";
import SelectPlaylistToPlay from "../components/Player/SelectPlaylistToPlay";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylists } from "../actions/playlistActions";
import { authActions } from "../redux/auth-slice";
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

  // Styles had to be applied this specific way, not from modules, not inline, because gh-pages have sometimes issues with styling
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <AnimatedPages>
      <main>
        <SelectPlaylistToPlay />
        <div style={styles}>
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
