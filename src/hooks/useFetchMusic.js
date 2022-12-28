import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/auth-slice";

import { useGetMusicDataQuery } from "../redux/api/dataApiSlice";

const useFetchMusic = () => {
  const dispatch = useDispatch();
  const { initialFetchMusicList } = useSelector(
    (state) => state.authentication.initials
  );
  const currentUser = sessionStorage?.getItem("currentUser");
  const songsList = useSelector((state) => state.songsList.songsList);

  const { isError, isLoading, isSuccess, refetch } = useGetMusicDataQuery(
    { currentUser: currentUser, songsList: songsList },
    {
      skip: !initialFetchMusicList,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(authActions.handleInitialFetchMusicList(false));

      return;
    }
    dispatch(
      authActions.setUsersMusicList({
        currentUser,
        songsList,
      })
    );
  }, [songsList, currentUser, dispatch, isSuccess]);
  useEffect(() => {
    refetch();
  }, []);
  return [isError, isLoading];
};

export default useFetchMusic;
