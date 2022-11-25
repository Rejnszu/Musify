import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/auth-slice";
import { fetchMusicData } from "../actions/musicActions";

const useFetchMusic = () => {
  const dispatch = useDispatch();
  const { initialFetchMusicList } = useSelector(
    (state) => state.authentication.initials
  );
  const currentUser = sessionStorage.getItem("currentUser");
  const songsList = useSelector((state) => state.songsList.songsList);

  useEffect(() => {
    if (initialFetchMusicList) {
      dispatch(fetchMusicData(currentUser, songsList));
      dispatch(authActions.handleInitialFetchMusicList(false));

      return;
    }
    dispatch(
      authActions.setUsersMusicList({
        currentUser,
        songsList,
      })
    );
  }, [currentUser, songsList, dispatch, initialFetchMusicList]);
};

export default useFetchMusic;
