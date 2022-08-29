import { songsActions } from "./songsList-slice";

export const fetchData = () => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await fetch(
        "https://musify-98a44-default-rtdb.firebaseio.com/music.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch music error.");
      }
      const data = await response.json();
      return data;
    };
    const musicData = await getData();
    dispatch(songsActions.setSongList(musicData));
  };
};

export const updateData = (songsList) => {
  return async (dispatch) => {
    const updateMusicData = async () => {
      const response = await fetch(
        "https://musify-98a44-default-rtdb.firebaseio.com/music.json",
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
    };
    try {
      await updateMusicData();
    } catch (error) {
      console.log(error);
    }
  };
};
