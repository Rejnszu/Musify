import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/auth-slice";

import { useGetPlaylistDataQuery } from "../redux/api/dataApiSlice";
const useFetchPlaylists = () => {
  const dispatch = useDispatch();
  const currentUser = sessionStorage.getItem("currentUser");
  const { initialFetchPlaylists } = useSelector(
    (state) => state.authentication.initials
  );
  const playlists = useSelector((state) => state.playlist.playlists);
  const { isError, isLoading, isSuccess, refetch } = useGetPlaylistDataQuery(
    {
      currentUser: currentUser,
    },
    { skip: !initialFetchPlaylists }
  );
  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    if (isSuccess) {
      dispatch(authActions.handleInitialFetchPlaylists(false));

      return;
    }
    dispatch(
      authActions.setUsersPlaylists({
        currentUser,
        playlists,
      })
    );
  }, [playlists, currentUser, dispatch, isSuccess]);
  return [isError, isLoading];
};

export default useFetchPlaylists;
