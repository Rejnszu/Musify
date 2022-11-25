import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import useFetchPlaylists from "../hooks/useFetchPlaylists";
import Playlist from "../components/playlists/Playlist";
import EmptyList from "../components/UI/EmptyList";
import PlaylistOverlay from "../components/UI/PlaylistOverlay";
import CreatePlaylist from "../components/playlists/CreatePlaylist";
import AnimatedPages from "../components/UI/AnimatedPages";

const PlaylistPage = () => {
  const fetchPlaylists = useFetchPlaylists();
  const isEmpty =
    useSelector((state) => state.playlist?.playlists).length === 0;
  const playlists = useSelector((state) => state.playlist.playlists);

  return (
    <AnimatedPages>
      <main>
        <CreatePlaylist />
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
        {isEmpty && <EmptyList>Couldn't find any playlists.</EmptyList>}
      </main>
    </AnimatedPages>
  );
};

export default PlaylistPage;
