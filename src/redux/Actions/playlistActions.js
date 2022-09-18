import { playlistActions } from "../playlist-slice";
import { authActions } from "../auth-slice";
export const fetchPlaylists = (currentUser, playlists) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://musify-98a44-default-rtdb.firebaseio.com/users.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      return data;
    };
    fetchData()
      .then(async (data) => {
        const currentUserData = await data.find(
          (user) => user.userName === currentUser
        );

        const currentUserPlaylists = await currentUserData.userPlaylists;

        return currentUserPlaylists;
      })
      .then((data) => {
        if (!data) {
          dispatch(playlistActions.setPlayListsOnStart([]));

          dispatch(
            authActions.setUsersPlaylists({
              currentUser: currentUser,
              playlists: playlists,
            })
          );

          return;
        }
        if (data) {
          dispatch(playlistActions.setPlayListsOnStart(data));
          dispatch(
            authActions.setUsersPlaylists({
              currentUser: currentUser,
              playlists: data,
            })
          );

          return;
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };
};
