import { authActions } from "../auth-slice";
import { songsActions } from "../songsList-slice";

export const fetchMusicData = (currentUser, songsList) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(songsActions.changeLoadingStatus("loading"));
      const response = await fetch(
        `https://musify-98a44-default-rtdb.firebaseio.com/users.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      dispatch(songsActions.changeLoadingStatus("loaded"));
      const currentUserData = data?.find(
        (user) => user.userName === currentUser
      );
      const currentUserMusic = currentUserData?.musicList;

      return currentUserMusic;
    };
    fetchData()
      .then((data) => {
        if (data.length > 0 && data[0] !== "empty") {
          dispatch(songsActions.setSongList(data));
          return;
        }

        if (data[0] === "empty") {
          dispatch(songsActions.resetSongList());
          dispatch(songsActions.setSongList(songsList));

          dispatch(
            authActions.setUsersMusicList({
              currentUser: currentUser,
              songsList: songsList,
            })
          );

          return;
        }
        if (data === undefined) {
          return;
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(songsActions.changeLoadingStatus("error"));
      });
  };
};

export const updateMusicData = (users) => {
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
