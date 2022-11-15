import React, { useState, useEffect, useMemo } from "react";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { updateAllData } from "./Actions/updateActions";
import { authActions } from "./redux/auth-slice";
import { getUsersFromDatabase } from "./Actions/authActions";
import { deleteCurrentUser, sendCurrentUser } from "./Actions/loginActions";

import WelcomePage from "./pages/WelcomePage";
import MusicPage from "./pages/MusicPage";
import PlaylistPage from "./pages/PlaylistPage";
import SettingsPage from "./pages/SettingsPage";
import PlayerPage from "./pages/PlayerPage";
import NavigationMobile from "./components/Navigation/NavigationMobile";
import NavigationDesktop from "./components/Navigation/NavigationDesktop";
import Button from "./components/UI/Button";
import AddToPlaylistModal from "./components/playlists/addToPlaylistModal/AddToPlaylistModal";
import AnimatedPages from "./components/UI/AnimatedPages";
import { songsActions } from "./redux/songsList-slice";
import { playlistActions } from "./redux/playlist-slice";
import { updateActions } from "./redux/update-slice";
import PlayerConsole from "./components/Player/PlayerConsole";
import { resetPlayer } from "./Actions/playerActions";

let firstPageLoad = true;
let firstUserLogin = true;

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1300);
  const playerCurrentSong = useSelector((state) => state.player.currentSong);
  const shouldUpdate = useSelector((state) => state.update.shouldUpdate);
  const users = useSelector((state) => state.authentication.users);
  const openModal = useSelector((state) => state.playlist.openModal);
  const audio = useSelector((state) => state.player.audio);
  const currentUser = useMemo(
    () =>
      users.find(
        (user) => user.userName === sessionStorage.getItem("currentUser")
      ),
    [users]
  );
  const isLogged = sessionStorage.getItem("isLogged");

  function logOut() {
    sessionStorage.setItem("isLogged", "false");
    dispatch(songsActions.resetSongList());
    dispatch(playlistActions.resetPlaylists());
    history.push("/Musify");
    deleteCurrentUser(currentUser);
    sessionStorage.removeItem("currentUser");
    dispatch(authActions.handleInitialFetchMusicList(true));
    dispatch(authActions.handleInitialFetchPlaylists(true));
    dispatch(authActions.handlerInitialUpdate(true));
    dispatch(resetPlayer(audio));
    firstPageLoad = true;
  }

  useEffect(() => {
    if (firstPageLoad) {
      getUsersFromDatabase()
        .then((data) => {
          if (data === null) {
            return;
          }
          dispatch(authActions.setUserListOnStart(data));

          firstPageLoad = false;
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [dispatch]);

  useEffect(() => {
    if (sessionStorage.getItem("isLogged") === "true" && firstUserLogin) {
      if (currentUser !== undefined) {
        sendCurrentUser(currentUser);
        firstUserLogin = false;
      }
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (
      sessionStorage.getItem("isLogged") === "true" &&
      location.pathname !== "/songs" &&
      location.pathname !== "/playlists" &&
      location.pathname !== "/settings" &&
      location.pathname !== "/player"
    ) {
      history.push("/songs");
    }
    if (
      sessionStorage.getItem("isLogged") === "false" &&
      location.pathname !== "/Musify"
    ) {
      history.push("/Musify");
    }
  }, [location]);

  useEffect(() => {
    if (sessionStorage.getItem("isLogged") === null) {
      sessionStorage.setItem("isLogged", "false");
    }
  }, []);

  useEffect(() => {
    if (shouldUpdate) {
      dispatch(updateAllData(users));
    }
    return () => {
      dispatch(updateActions.shouldNotUpdate());
    };
  }, [users, dispatch]);

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
    <AnimatePresence exitBeforeEnter>
      <React.Fragment>
        <Switch location={location} key={location.pathname}>
          {isLogged === "false" && (
            <Route path="/Musify">
              <WelcomePage />
            </Route>
          )}
          {isLogged === "true" && (
            <React.Fragment>
              {isMobile ? <NavigationMobile /> : <NavigationDesktop />}
              <AnimatedPages>
                <Button styles="button--log-out" onClick={logOut}>
                  Log Out
                </Button>
                {playerCurrentSong !== undefined &&
                  location.pathname !== "/player" && <PlayerConsole />}
              </AnimatedPages>
              <Route path="/" exact>
                <Redirect to="/Musify/" />
              </Route>
              <Route path="/songs">
                <MusicPage />
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
              {openModal && <AddToPlaylistModal />}
            </React.Fragment>
          )}
        </Switch>
      </React.Fragment>
    </AnimatePresence>
  );
}

export default App;
