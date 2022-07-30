import React from "react";

import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navigation from "./components/navigation/Navigation";
import { useSelector } from "react-redux/es/hooks/useSelector";
import AddToPlaylistModal from "./components/playlists/addToPlaylistModal/AddToPlaylistModal";
import MusicPage from "./pages/musicPage";
import PlaylistPage from "./pages/playlistPage";

function App() {
  const location = useLocation();
  const openModal = useSelector((state) => state.playlist.openModal);
  return (
    <React.Fragment>
      <Navigation />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path="/" exact>
            <Redirect to="/Musify" />
          </Route>
          <Route path="/Musify">
            <MusicPage />
          </Route>
          <Route path="/playlists">
            <PlaylistPage />
          </Route>
        </Switch>
      </AnimatePresence>
      {openModal && <AddToPlaylistModal />}
    </React.Fragment>
  );
}

export default App;
