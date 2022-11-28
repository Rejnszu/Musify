import React from "react";
import AnimatedPages from "../components/UI/FramerGenerals/AnimatedPages";
import SelectPlaylistToPlay from "../components/Player/SelectPlaylistToPlay";
import Player from "../components/Player/Player";

import { useSelector } from "react-redux";
import useFetchPlaylists from "../hooks/useFetchPlaylists";

export default function PlayerPage(props) {
  const fetchPlaylists = useFetchPlaylists();
  const selectedPlaylist = useSelector((state) => state.player.songList);
  const currentSong = useSelector((state) => state.player.currentSong);

  // Styles had to be applied this specific way, not from modules, not inline, because gh-pages have sometimes issues with styling
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <AnimatedPages>
      <main>
        <SelectPlaylistToPlay />
        <div style={styles}>
          {currentSong !== undefined &&
            selectedPlaylist !== undefined &&
            selectedPlaylist !== "none" && (
              <Player playlist={selectedPlaylist} />
            )}
        </div>
      </main>
    </AnimatedPages>
  );
}
