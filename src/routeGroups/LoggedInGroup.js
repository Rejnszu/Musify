import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import AnimatedPages from "../components/UI/FramerGenerals/AnimatedPages";
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

        <AnimatedPages>
          <LogOut onLogOut={props.onLogOut} />
          {playerCurrentSong !== undefined &&
            location.pathname !== "/player" && <PlayerConsole />}
        </AnimatedPages>

        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route path={["/", "/Musify"]} exact>
              <Redirect to="/songs" />
            </Route>
            <Route path="/songs" exact>
              <MusicPage />
            </Route>
            <Route path="/songs/:songId">
              <SongDetails />
            </Route>
            <Route path="/playlists">
              <PlaylistPage />
            </Route>
            <Route path="/settings">
              <SettingsPage />
            </Route>
            <Route path="/player">
              <PlayerPage />
            </Route>
            <Route path="*">
              <EmptyList>Page not found</EmptyList>
            </Route>
          </Switch>
        </AnimatePresence>
      </React.Fragment>
    )
  );
};

export default LoggedInGroup;
