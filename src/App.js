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
import { songsActions } from "./redux/songsList-slice";
import { useDispatch } from "react-redux";
import Button from "./components/UI/Button";
let isInitial = true;
function App() {
  const songsList = useSelector((state) => state.songsList.songsList);
  const dispatch = useDispatch();
  const location = useLocation();
  const openModal = useSelector((state) => state.playlist.openModal);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 850);
  const [loading, setLoading] = useState(null);
  const [display, setDisplay] = useState("cards");
  const setDisplayToList = () => {
    setDisplay("list");
  };
  const setDisplayToCards = () => {
    setDisplay("cards");
  };

  function setInitialSongsList() {
    dispatch(songsActions.resetSongList());
  }

  useEffect(() => {
    const fetchMusicData = async () => {
      setLoading("loading");
      const response = await fetch(
        "https://musify-98a44-default-rtdb.firebaseio.com/music.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setLoading("loaded");
      return data;
    };
    fetchMusicData()
      .then((data) => {
        dispatch(songsActions.setSongList(data));
      })
      .catch((error) => {
        setLoading("error");
      });
  }, [dispatch]);
  useEffect(() => {
    const updateMusicData = async () => {
      if (isInitial) {
        isInitial = false;

        return;
      }
      setLoading("loading");
      const response = await fetch(
        "https://musify-98a44-default-rtdb.firebaseio.com/music.json",
        {
          method: "PUT",
          body: JSON.stringify(songsList),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setLoading("loaded");
      return data;
    };
    updateMusicData().catch((error) => {
      setLoading("error");
    });
  }, [songsList]);

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
      <Button onClick={setInitialSongsList}>Reset</Button>
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
            <MusicPage loading={loading} display={display} />
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
