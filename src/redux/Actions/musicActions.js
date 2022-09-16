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
      return data;
    };
    fetchData()
      .then(async (data) => {
        const currentUserData = await data.find(
          (user) => user.userName === currentUser
        );

        const currentUserMusic = await currentUserData.musicList;
        return currentUserMusic;
      })
      .then((data) => {
        if (data) {
          dispatch(songsActions.setSongList(data));
          dispatch(
            authActions.setUsersMusicList({
              currentUser: currentUser,
              songsList: data,
            })
          );
          dispatch(songsActions.changeLoadingStatus("loaded"));
          return;
        }

        if (!data) {
          dispatch(songsActions.resetSongList());
          dispatch(songsActions.setSongList(songsList));

          dispatch(
            authActions.setUsersMusicList({
              currentUser: currentUser,
              songsList: songsList,
            })
          );
          dispatch(songsActions.changeLoadingStatus("loaded"));
          return;
        }
      })

      .catch((error) => {
        console.log(error);
        dispatch(songsActions.changeLoadingStatus("error"));
      });
  };
};

