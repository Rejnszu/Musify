import React from "react";
import Playlist from "../components/playlists/Playlist";
import EmptyList from "../components/UI/EmptyList";
import PlaylistOverlay from "../components/UI/PlaylistOverlay";
import { useSelector } from "react-redux";
import CreatePlaylist from "../components/playlists/CreatePlaylist";

export default function PlaylistPage() {
  const isEmpty = useSelector((state) => state.playlist.playlists).length === 0;
  const playlists = useSelector((state) => state.playlist.playlists);
  console.log(playlists);
  return (
    <React.Fragment>
      <CreatePlaylist />
      {!isEmpty && (
        <PlaylistOverlay>
          {playlists.map((playlist, i) => {
            return <Playlist id={playlist.id} key={i} name={playlist.name} />;
          })}
        </PlaylistOverlay>
      )}
      {isEmpty && <EmptyList>Couldn't find any playlists.</EmptyList>}
    </React.Fragment>
  );
}
