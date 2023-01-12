import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/auth-slice";
import { userActions } from "../redux/user-slice";

import { useGetUserPlaylistDataQuery } from "../redux/api/userDataApiSlice";
const useFetchPlaylists = () => {
  const dispatch = useDispatch();
  const currentUser = sessionStorage.getItem("currentUser");
  const { initialFetchPlaylists } = useSelector(
    (state) => state.authentication.initials
  );
  const playlists = useSelector((state) => state.playlist.playlists);
  const { isError, isLoading, isSuccess, refetch } =
    useGetUserPlaylistDataQuery(
      {
        user: currentUser,
      },
      { skip: !initialFetchPlaylists }
    );

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
    dispatch(userActions.setUserPlaylists(playlists));
  }, [playlists, currentUser, dispatch, isSuccess]);
  useEffect(() => {
    refetch();
  }, []);
  return [isError, isLoading];
};

export default useFetchPlaylists;
