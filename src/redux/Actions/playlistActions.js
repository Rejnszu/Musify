import { playlistActions } from "../playlist-slice";

export const fetchPlaylists = (currentUser) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://musify-98a44-default-rtdb.firebaseio.com/users.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();

      const currentUserData = data?.find(
        (user) => user.userName === currentUser
      );
      const currentUserPlaylists = currentUserData?.userPlaylists;

      return currentUserPlaylists;
    };
    fetchData()
      .then((data) => {
        if (data === undefined) {
          return;
        }
        if (data[0] === "empty") {
          dispatch(playlistActions.setPlayListsOnStart([]));

          return;
        }
        dispatch(playlistActions.currentUserPlaylists(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const updatePlaylistData = (users) => {
  return async (dispatch) => {
    const updateData = async () => {
      const response = await fetch(
        `https://musify-98a44-default-rtdb.firebaseio.com/users.json`,
        {
          method: "PUT",
          body: JSON.stringify(users),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    };
    updateData().catch((error) => {});
  };
};
