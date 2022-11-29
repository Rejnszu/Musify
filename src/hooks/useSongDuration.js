import { useState } from "react";
export const useSongDuration = function (song) {
  const [duration, setDuration] = useState("00:00");
  const audio = new Audio(song);
  audio.onloadedmetadata = (e) => {
    if (audio.readyState > 0) {
      const minutes = "0" + parseInt(audio.duration / 60, 10);
      const seconds = "0" + parseInt(audio.duration % 60);
      setDuration(minutes + ":" + seconds.slice(-2));
    }
  };
  return duration;
};
