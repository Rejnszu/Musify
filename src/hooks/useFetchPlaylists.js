import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/auth-slice";
import { fetchPlaylists } from "../actions/playlistActions";
const useFetchPlaylists = () => {
  const dispatch = useDispatch();
  const currentUser = sessionStorage.getItem("currentUser");
  const { initialFetchPlaylists } = useSelector(
    (state) => state.authentication.initials
  );
  const playlists = useSelector((state) => state.playlist.playlists);
  useEffect(() => {
    if (initialFetchPlaylists) {
      dispatch(fetchPlaylists(currentUser));
      dispatch(authActions.handleInitialFetchPlaylists(false));

      return;
    }
    dispatch(
      authActions.setUsersPlaylists({
        currentUser,
        playlists,
      })
    );
  }, [playlists, currentUser, dispatch, initialFetchPlaylists]);
};

export default useFetchPlaylists;
