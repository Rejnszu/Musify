import React, { useState } from "react";

import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navigation from "./components/navigation/Navigation";
import { useSelector } from "react-redux/es/hooks/useSelector";
import AddToPlaylistModal from "./components/playlists/addToPlaylistModal/AddToPlaylistModal";
import MusicPage from "./pages/MusicPage";
import PlaylistPage from "./pages/PlaylistPage";
import ChangeSongsDisplay from "./components/UI/ChangeSongsDisplay";

function App() {
  const location = useLocation();
  const openModal = useSelector((state) => state.playlist.openModal);
  const [display, setDisplay] = useState("cards");
  const setDisplayToList = () => {
    setDisplay("list");
  };
  const setDisplayToCards = () => {
    setDisplay("cards");
  };
  return (
    <React.Fragment>
      <Navigation />

      <AnimatePresence exitBeforeEnter>
        {(location.pathname === "/Musify/" ||
          location.pathname === "/Musify") && (
          <ChangeSongsDisplay
            setCards={setDisplayToCards}
            setList={setDisplayToList}
          />
        )}
        <Switch location={location} key={location.pathname}>
          <Route path="/" exact>
            <Redirect to="/Musify" />
          </Route>
          <Route path="/Musify">
            <MusicPage display={display} />
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
