import React from "react";
import AnimatedPages from "../components/UI/AnimatedPages";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/auth-slice";
import styles from "./PlayerPage.module.css";
import Player from "../components/Player/Player";
import { fetchPlaylists } from "../redux/Actions/playlistActions";
import SelectPlaylistToPlay from "../components/Player/SelectPlaylistToPlay";
let currentAudio;
export default function PlayerPage(props) {
  const dispatch = useDispatch();
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  function selectPlaylist(value) {
    setSelectedPlaylist(value);
  }

  function stopAudio(audio) {
    currentAudio = audio;
    props.getAudioToStop(audio);
  }

  useEffect(() => {
    if (currentAudio === undefined) {
      return;
    } else {
      currentAudio.pause();
    }
  }, [selectedPlaylist]);

  const currentUser = sessionStorage.getItem("currentUser");
  const initialFetchPlaylists = useSelector(
    (state) => state.authentication.initials.initialFetchPlaylists
  );
  const playlists = useSelector((state) => state.playlist.playlists);
  useEffect(() => {
    if (initialFetchPlaylists) {
      dispatch(fetchPlaylists(currentUser, playlists));

      dispatch(authActions.handleInitialFetchPlaylists(false));

      return;
    }
    dispatch(
      authActions.setUsersPlaylists({
        currentUser,
        playlists,
      })
    );
  }, [dispatch, currentUser, playlists, initialFetchPlaylists]);
  return (
    <AnimatedPages>
      <SelectPlaylistToPlay selectPlaylist={selectPlaylist} />
      <div className={styles["player__overlay"]}>
        {selectedPlaylist !== null && selectedPlaylist !== "none" && (
          <Player
            stopAudio={stopAudio}
            isMobile={props.isMobile}
            playlist={selectedPlaylist}
          />
        )}
      </div>
    </AnimatedPages>
  );
}
