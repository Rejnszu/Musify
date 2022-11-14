import { songsActions } from "../redux/songsList-slice";

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
      .then((data) => {
        const currentUserData = data.find(
          (user) => user.userName === currentUser
        );

        const currentUserMusic = currentUserData.musicList;
        return currentUserMusic;
      })
      .then((data) => {
        if (data) {
          dispatch(songsActions.setSongList(data));
          dispatch(songsActions.changeLoadingStatus("loaded"));
          return;
        }

        if (!data) {
          dispatch(songsActions.resetSongList());
          dispatch(songsActions.setSongList(songsList));
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
