import React, { useMemo } from "react";
import styles from "./LogOut.module.css";
import Button from "../../UI/Button";
import { songsActions } from "../../../redux/songsList-slice";
import { playlistActions } from "../../../redux/playlist-slice";
import { authActions } from "../../../redux/auth-slice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteCurrentUser } from "../../../actions/loginActions";
import { resetPlayer } from "../../../actions/playerActions";

const LogOut = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const audio = useSelector((state) => state.player.audio);
  const users = useSelector((state) => state.authentication.users);
  const currentUser = useMemo(
    () =>
      users.find(
        (user) => user.userName === sessionStorage.getItem("currentUser")
      ),
    [users]
  );
  function logOut() {
    sessionStorage.setItem("isLogged", "false");
    dispatch(songsActions.resetSongList());
    dispatch(playlistActions.resetPlaylists());
    history.push("/Musify");
    deleteCurrentUser(currentUser);
    sessionStorage.removeItem("currentUser");
    dispatch(authActions.handleInitialFetchMusicList(true));
    dispatch(authActions.handleInitialFetchPlaylists(true));
    dispatch(authActions.handlerInitialUpdate(true));
    dispatch(resetPlayer(audio));
    props.onLogOut();
  }
  return (
    <Button styles={styles["button--log-out"]} onClick={logOut}>
      Log Out
    </Button>
  );
};

export default LogOut;
