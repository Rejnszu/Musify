import { playerActions } from "../redux/player-slice";

export const resetPlayer = (audio) => {
  if (audio) {
    audio.pause();
  }
  return (dispatch) => {
    dispatch(playerActions.playerReset());
  };
};
