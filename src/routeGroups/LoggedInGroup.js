import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import AnimatedPages from "../components/UI/AnimatedPages";
import NavigationDesktop from "../components/Navigation/NavigationDesktop";
import NavigationMobile from "../components/Navigation/NavigationMobile";
import EmptyList from "../components/UI/EmptyList";
import PlayerConsole from "../components/Player/PlayerConsole";
import LogOut from "../components/LoginForms/LogOut/LogOut";
import SongDetails from "../components/SongDetails/SongDetails";

import MusicPage from "../pages/MusicPage";
import PlaylistPage from "../pages/PlaylistPage";
import SettingsPage from "../pages/SettingsPage";
import PlayerPage from "../pages/PlayerPage";
import { AnimatePresence } from "framer-motion";

const LoggedInGroup = (props) => {
  const isLogged = sessionStorage.getItem("isLogged");
  const playerCurrentSong = useSelector((state) => state.player.currentSong);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1300);
  const location = useLocation();

  useEffect(() => {
    function checkIfMobile() {
      setIsMobile(window.innerWidth < 1300);
    }
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  });
  return (
    isLogged === "true" && (
      <React.Fragment>
        {isMobile ? <NavigationMobile /> : <NavigationDesktop />}
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
              <PlayerPage isMobile={isMobile} />
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
