import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import useFetchPlaylists from "../hooks/useFetchPlaylists";
import Playlist from "../components/playlists/Playlist";
import EmptyList from "../components/UI/utils/EmptyList";
import PlaylistOverlay from "../components/UI/Layout/PlaylistOverlay";
import CreatePlaylist from "../components/playlists/CreatePlaylist";
import AnimatedPages from "../components/UI/FramerGenerals/AnimatedPages";
import Loader from "../components/UI/utils/Loader";

const PlaylistPage = () => {
  const [isError, isLoading] = useFetchPlaylists();
  const playlists = useSelector((state) => state.playlist.playlists);
  const isEmpty = playlists.length === 0;
  if (isError) {
    return <EmptyList>Couldn't fetch playlists.</EmptyList>;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <AnimatedPages>
      <main>
        <CreatePlaylist />
        {isEmpty && <EmptyList>Couldn't find any playlists.</EmptyList>}
        {!isEmpty && (
          <PlaylistOverlay>
            <AnimatePresence>
              {playlists.map((playlist, i) => {
                return (
                  <Playlist
                    items={playlist.items}
                    id={playlist.id}
                    key={playlist.id}
                    name={playlist.name}
                  />
                );
              })}
            </AnimatePresence>
          </PlaylistOverlay>
        )}
      </main>
    </AnimatedPages>
  );
};

export default PlaylistPage;
