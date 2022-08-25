import React, { useState, useEffect } from "react";

import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NavigationDesktop from "./components/navigation/NavigationDesktop";
import { useSelector } from "react-redux/es/hooks/useSelector";
import AddToPlaylistModal from "./components/playlists/addToPlaylistModal/AddToPlaylistModal";
import MusicPage from "./pages/MusicPage";
import PlaylistPage from "./pages/PlaylistPage";
import ChangeSongsDisplay from "./components/UI/ChangeSongsDisplay";
import NavigationMobile from "./components/navigation/NavigationMobile";

function App() {
  const location = useLocation();
  const openModal = useSelector((state) => state.playlist.openModal);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 850);
  console.log("resize");
  const [display, setDisplay] = useState("cards");
  const setDisplayToList = () => {
    setDisplay("list");
  };
  const setDisplayToCards = () => {
    setDisplay("cards");
  };
  useEffect(() => {
    function checkIfMobile() {
      setIsMobile(window.innerWidth < 850);
    }
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  });

  return (
    <React.Fragment>
      {isMobile ? <NavigationMobile /> : <NavigationDesktop />}

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
