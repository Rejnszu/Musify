import { playerActions } from "../player-slice";

export const resetPlayer = (audio) => {
  if (audio) {
    audio.pause();
  }
  return (dispatch) => {
    dispatch(playerActions.playerReset());
  };
};
