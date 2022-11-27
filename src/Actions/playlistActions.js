import { playlistActions } from "../redux/playlist-slice";

export const fetchPlaylists = (currentUser) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(playlistActions.changeLoadingStatus("loading"));
      const response = await fetch(
        `https://musify-98a44-default-rtdb.firebaseio.com/users.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong while fetching playlists");
      }

      const data = await response.json();

      return data;
    };
    fetchData()
      .then((data) => {
        const currentUserData = data.find(
          (user) => user.userName === currentUser
        );

        const currentUserPlaylists = currentUserData.userPlaylists;

        return currentUserPlaylists;
      })
      .then((data) => {
        if (!data) {
          dispatch(playlistActions.setPlayListsOnStart([]));
          dispatch(playlistActions.changeLoadingStatus("loaded"));
          return;
        }
        if (data) {
          dispatch(playlistActions.setPlayListsOnStart(data));
          dispatch(playlistActions.changeLoadingStatus("loaded"));
          return;
        }
      })

      .catch((error) => {
        console.log(error.message);
        dispatch(playlistActions.changeLoadingStatus("error"));
      });
  };
};
