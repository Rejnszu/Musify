import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../redux/user-slice";
import { useGetUserPlaylistDataQuery } from "../redux/api/userDataApiSlice";
import { updateActions } from "../redux/update-slice";
const useFetchPlaylists = () => {
  const dispatch = useDispatch();
  const currentUser = sessionStorage.getItem("currentUser");
  const { initialFetchPlaylists } = useSelector(
    (state) => state.update.initials
  );
  const playlists = useSelector((state) => state.playlist.playlists);
  const { isError, isLoading, isSuccess } = useGetUserPlaylistDataQuery(
    {
      user: currentUser,
    },
    { skip: !initialFetchPlaylists }
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateActions.handleInitialFetchPlaylists(false));
      return;
    }

    dispatch(userActions.setUserPlaylists(playlists));
  }, [playlists, currentUser, dispatch, isSuccess]);

  return [isError, isLoading];
};

export default useFetchPlaylists;
