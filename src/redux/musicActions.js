import { songsActions } from "./songsList-slice";

export const fetchMusicData = (user, songsList) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(songsActions.changeLoadingStatus("loading"));
      const response = await fetch(
        `https://musify-98a44-default-rtdb.firebaseio.com/${user}.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      dispatch(songsActions.changeLoadingStatus("loaded"));
      return data;
    };
    fetchData()
      .then((data) => {
        if (!data) {
          dispatch(songsActions.resetSongList());
          dispatch(songsActions.setSongList(songsList));
          return;
        }
        dispatch(songsActions.setSongList(data));
      })
      .catch((error) => {
        dispatch(songsActions.changeLoadingStatus("error"));
      });
  };
};

export const updateMusicData = (user, songsList) => {
  return async (dispatch) => {
    const updateData = async () => {
      dispatch(songsActions.changeLoadingStatus("loading"));
      const response = await fetch(
        `https://musify-98a44-default-rtdb.firebaseio.com/${user}.json`,
        {
          method: "PUT",
          body: JSON.stringify(songsList),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      dispatch(songsActions.changeLoadingStatus("loaded"));
      return data;
    };
    updateData().catch((error) => {
      dispatch(songsActions.changeLoadingStatus("error"));
    });
  };
};
