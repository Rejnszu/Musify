import React from "react";
import Playlists from "../components/playlists/Playlists";
import EmptyList from "../components/UI/EmptyList";
import Overlay from "../components/UI/Overlay";
import { useSelector } from "react-redux";
export default function PlaylistPage() {
  const isEmpty = useSelector((state) => state.playlist.playlist).length === 0;
  return (
    <React.Fragment>
      <Overlay>{!isEmpty && <Playlists />}</Overlay>
      {isEmpty && <EmptyList>Couldn't find any playlists.</EmptyList>}
    </React.Fragment>
  );
}
