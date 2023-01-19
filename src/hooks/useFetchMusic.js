import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserMusicDataQuery } from "../redux/api/userDataApiSlice";
import { userActions } from "../redux/user-slice";
import { updateActions } from "../redux/update-slice";
const useFetchMusic = () => {
  const dispatch = useDispatch();
  const { initialFetchMusicList } = useSelector(
    (state) => state.update.initials
  );
  const currentUser = sessionStorage?.getItem("currentUser");
  const songsList = useSelector((state) => state.songsList.songsList);

  const { isError, isLoading, isSuccess } = useGetUserMusicDataQuery(
    { user: currentUser, songsList: songsList },
    {
      skip: !initialFetchMusicList,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateActions.handleInitialFetchMusicList(false));

      return;
    }

    dispatch(userActions.setUserMusicList(songsList));
  }, [songsList, currentUser, dispatch, isSuccess]);


  return [isError, isLoading];
};

export default useFetchMusic;
