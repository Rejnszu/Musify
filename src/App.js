import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { updateAllData } from "./redux/Actions/updateActions";
import { authActions } from "./redux/auth-slice";
import { getUsersFromDatabase } from "./redux/Actions/authActions";
import {
  deleteCurrentUser,
  sendCurrentUser,
  getCurrentUser,
} from "./redux/Actions/loginActions";

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
let audioToStop;
function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1300);

  const shouldUpdate = useSelector((state) => state.update.shouldUpdate);
  const users = useSelector((state) => state.authentication.users);
  const openModal = useSelector((state) => state.playlist.openModal);
  const reduxCurrentUser = useSelector(
    (state) => state.authentication.currentUser
  );
  const currentUser = sessionStorage.getItem("currentUser");
  const [isLoggedLocal, setIsLoggedLocal] = useState("false");

  function logIn() {
    sessionStorage.setItem("isLogged", "true");
    setIsLoggedLocal("true");
    history.push("/songs");
  }
  function logOut() {
    sessionStorage.setItem("isLogged", "false");
    dispatch(songsActions.resetSongList());
    dispatch(playlistActions.resetPlaylists());
    history.push("/Musify");
    sessionStorage.removeItem("currentUser");
    deleteCurrentUser(reduxCurrentUser);
    dispatch(authActions.handleInitialFetchMusicList(true));
    dispatch(authActions.handleInitialFetchPlaylists(true));
    dispatch(authActions.handlerInitialUpdate(true));
  }

  useEffect(() => {
    getUsersFromDatabase().then((data) => {
      if (data === null) {
        return;
      }
      dispatch(authActions.setUserListOnStart(data));
    });
  }, [isLoggedLocal, dispatch]);

  useEffect(() => {
    if (sessionStorage.getItem("isLogged") === "true") {
      const user = users.find((user) => user.userName === currentUser);
      if (user !== undefined) {
        sendCurrentUser(user).then(() => {
          getCurrentUser(user).then((data) => {
            dispatch(authActions.setCurrentUser(data));
          });
        });
      }
    }
  }, [users, currentUser, dispatch]);

  useEffect(() => {
    if (sessionStorage.getItem("isLogged") === "false") {
      setIsLoggedLocal("false");
    }
  });

  useEffect(() => {
    if (sessionStorage.getItem("isLogged") === null) {
      sessionStorage.setItem("isLogged", "false");
    }
    setIsLoggedLocal(sessionStorage.getItem("isLogged"));
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
  // function getAudioToStop(audio) {
  //   audioToStop = audio;
  // }
  // useEffect(() => {
  //   if (audioToStop !== undefined) {
  //     if (!audioToStop.paused) {
  //       audioToStop.pause();
  //     }
  //   }
  // });
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
              <AnimatedPages>
                <Button styles="button--log-out" onClick={logOut}>
                  Log Out
                </Button>
                <PlayerConsole />
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
                <PlayerPage
                  // getAudioToStop={getAudioToStop}
                  isMobile={isMobile}
                />
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
