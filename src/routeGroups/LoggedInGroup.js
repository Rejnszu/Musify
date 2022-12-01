import React from "react";
import { Route, Navigate, useLocation, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import EmptyList from "../components/UI/utils/EmptyList";
import PlayerConsole from "../components/Player/PlayerConsole";
import LogOut from "../components/LoginForms/LogOut/LogOut";
import SongDetails from "../components/SongDetails/SongDetails";
import Navigation from "../components/Navigation/Navigation";

import MusicPage from "../pages/MusicPage";
import PlaylistPage from "../pages/PlaylistPage";
import SettingsPage from "../pages/SettingsPage";
import PlayerPage from "../pages/PlayerPage";

const LoggedInGroup = (props) => {
  const isLogged = sessionStorage.getItem("isLogged");
  const playerCurrentSong = useSelector((state) => state.player.currentSong);
  const location = useLocation();

  return (
    isLogged === "true" && (
      <React.Fragment>
        <Navigation />
        <LogOut onLogOut={props.onLogOut} />

        {playerCurrentSong !== undefined && location.pathname !== "/player" && (
          <PlayerConsole />
        )}

        <Routes key={location.pathname}>
          {["/", "/Musify"].map((path) => {
            return (
              <Route
                path={path}
                key={path}
                element={<Navigate replace to="/songs" />}
              />
            );
          })}

          <Route path="/songs" element={<MusicPage />} />

          <Route path="/songs/:songId" element={<SongDetails />} />

          <Route path="/playlists" element={<PlaylistPage />} />

          <Route path="/settings" element={<SettingsPage />} />

          <Route path="/player" element={<PlayerPage />} />

          <Route path="*" element={<EmptyList>Page not found</EmptyList>} />
        </Routes>
      </React.Fragment>
    )
  );
};

export default LoggedInGroup;
