import React from "react";
import styles from "./LogOut.module.css";
import Button from "../../UI/utils/Button";
import { songsActions } from "../../../redux/songsList-slice";
import { playlistActions } from "../../../redux/playlist-slice";
import { authActions } from "../../../redux/auth-slice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPlayer } from "../../../actions/playerActions";
import { usersApiSlice } from "../../../redux/api/userDataApiSlice";
import { songsApiSlice } from "../../../redux/api/songsApiSlice";
import { useDeleteCurrentUserMutation } from "../../../redux/api/currentUserApiSlice";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const audio = useSelector((state) => state.player.audio);

  const [deleteCurrentUser] = useDeleteCurrentUserMutation();

  function logOut() {
    // dispatch(songsActions.resetSongList());
    // dispatch(playlistActions.resetPlaylists());
    // dispatch(usersApiSlice.util.resetApiState());
    // dispatch(songsApiSlice.util.resetApiState());
    // dispatch(authActions.handleInitialFetchMusicList(true));
    // dispatch(authActions.handleInitialFetchPlaylists(true));
    // dispatch(authActions.handlerInitialUpdate(true));
    deleteCurrentUser(sessionStorage.getItem("currentUser"));
    sessionStorage.setItem("isLogged", "false");
    sessionStorage.removeItem("currentUser");
    // dispatch(resetPlayer(audio));

    navigate(0);
    navigate("/Musify");
  }
  return (
    <Button styles={styles["button--log-out"]} onClick={logOut}>
      Log Out
    </Button>
  );
};

export default LogOut;
