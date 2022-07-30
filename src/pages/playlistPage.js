import React from "react";
import Playlist from "../components/playlists/Playlist";
import EmptyList from "../components/UI/EmptyList";
import PlaylistOverlay from "../components/UI/PlaylistOverlay";
import { useSelector } from "react-redux";
import CreatePlaylist from "../components/playlists/CreatePlaylist";
import AnimatedPages from "../components/UI/AnimatedPages";
import { AnimatePresence } from "framer-motion";
export default function PlaylistPage() {
  const isEmpty = useSelector((state) => state.playlist.playlists).length === 0;
  const playlists = useSelector((state) => state.playlist.playlists);

  return (
    <AnimatedPages>
      <CreatePlaylist />
      {!isEmpty && (
        <PlaylistOverlay>
          <AnimatePresence>
            {playlists.map((playlist, i) => {
              return (
                <Playlist
                  items={playlist.items}
                  id={playlist.id}
                  key={i}
                  name={playlist.name}
                />
              );
            })}
          </AnimatePresence>
        </PlaylistOverlay>
      )}
      {isEmpty && <EmptyList>Couldn't find any playlists.</EmptyList>}
    </AnimatedPages>
  );
}
