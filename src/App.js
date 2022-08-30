import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NavigationDesktop from "./components/Navigation/NavigationDesktop";
import { useSelector } from "react-redux/es/hooks/useSelector";
import AddToPlaylistModal from "./components/playlists/addToPlaylistModal/AddToPlaylistModal";
import MusicPage from "./pages/MusicPage";
import PlaylistPage from "./pages/PlaylistPage";
import ChangeSongsDisplay from "./components/UI/ChangeSongsDisplay";
import NavigationMobile from "./components/Navigation/NavigationMobile";
import { songsActions } from "./redux/songsList-slice";
import { useDispatch } from "react-redux";
import Button from "./components/UI/Button";
import { fetchMusicData, updateMusicData } from "./redux/musicActions";
import WelcomePage from "./pages/WelcomePage";
import { authActions } from "./redux/auth-slice";
import { useHistory } from "react-router-dom";
let isInitial = true;

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
  const [display, setDisplay] = useState("cards");

  const songsList = useSelector((state) => state.songsList.songsList);

  const openModal = useSelector((state) => state.playlist.openModal);

  const isLogged = useSelector((state) => state.authentication.isLogged);
  const [isLoggedLocal, setIsLoggedLocal] = useState("false");

  const setDisplayToList = () => {
    setDisplay("list");
  };
  const setDisplayToCards = () => {
    setDisplay("cards");
  };

  function setInitialSongsList() {
    dispatch(songsActions.resetSongList());
  }
  function logOut() {
    localStorage.setItem("isLogged", "false");
    setIsLoggedLocal("false");
    history.push("/Musify");
  }
  function logIn() {
    localStorage.setItem("isLogged", true);
    setIsLoggedLocal("true");
    history.push("/songs");
  }

  useEffect(() => {
    setIsLoggedLocal(localStorage.getItem("isLogged"));
  }, []);

  useEffect(() => {
    dispatch(fetchMusicData("music", songsList));
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(updateMusicData("music", songsList));
  }, [songsList, dispatch]);

  useEffect(() => {
    function checkIfMobile() {
      setIsMobile(window.innerWidth < 1200);
    }
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  });
  return (
    <AnimatePresence exitBeforeEnter>
      <React.Fragment>
        <Switch location={location} key={location.pathname}>
          {isLoggedLocal === "false" && (
            <Route path="/Musify">
              <WelcomePage logIn={logIn} />
            </Route>
          )}
          {isLoggedLocal === "true" && (
            <React.Fragment>
              {isMobile ? <NavigationMobile /> : <NavigationDesktop />}
              {/* <Button onClick={setInitialSongsList}>Reset</Button> */}
              <Button styles="button--log-out" onClick={logOut}>
                Log Out
              </Button>
              {location.pathname === "/songs" && (
                <ChangeSongsDisplay
                  setCards={setDisplayToCards}
                  setList={setDisplayToList}
                />
              )}

              <Route path="/" exact>
                <Redirect to="/Musify" />
              </Route>
              <Route path="/songs">
                <MusicPage display={display} />
              </Route>
              <Route path="/playlists">
                <PlaylistPage />
              </Route>

              {openModal && <AddToPlaylistModal />}
            </React.Fragment>
          )}
        </Switch>
      </React.Fragment>
    </AnimatePresence>
  );
}

export default App;
