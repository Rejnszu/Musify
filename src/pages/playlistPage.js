import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { authActions } from "../redux/auth-slice";
import { fetchPlaylists } from "../redux/Actions/playlistActions";
import Playlist from "../components/playlists/Playlist";
import EmptyList from "../components/UI/EmptyList";
import PlaylistOverlay from "../components/UI/PlaylistOverlay";
import CreatePlaylist from "../components/playlists/CreatePlaylist";
import AnimatedPages from "../components/UI/AnimatedPages";

let isInitial = true;

const PlaylistPage = () => {
  console.log("playlist");
  const dispatch = useDispatch();
  const isEmpty =
    useSelector((state) => state.playlist?.playlists).length === 0;

  const currentUser = sessionStorage.getItem("currentUser");

  const playlists = useSelector((state) => state.playlist.playlists);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(
      authActions.setUsersPlaylists({
        currentUser,
        playlists,
      })
    );
  }, [dispatch, playlists, currentUser]);

  useEffect(() => {
    dispatch(fetchPlaylists(currentUser, playlists));
  }, [dispatch, currentUser]);
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
};

export default PlaylistPage;
