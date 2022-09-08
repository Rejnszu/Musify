import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NavigationDesktop from "./components/Navigation/NavigationDesktop";
import { useSelector, useDispatch } from "react-redux";
import AddToPlaylistModal from "./components/playlists/addToPlaylistModal/AddToPlaylistModal";
import MusicPage from "./pages/MusicPage";
import PlaylistPage from "./pages/PlaylistPage";
import SettingsPage from "./pages/SettingsPage";
import ChangeSongsDisplay from "./components/UI/ChangeSongsDisplay";
import NavigationMobile from "./components/Navigation/NavigationMobile";

import Button from "./components/UI/Button";
import { fetchMusicData, updateMusicData } from "./redux/Actions/musicActions";
import {
  fetchPlaylists,
  updatePlaylistData,
} from "./redux/Actions/playlistActions";
import WelcomePage from "./pages/WelcomePage";
import { authActions } from "./redux/auth-slice";
import { getUsersFromDatabase } from "./redux/Actions/authActions";
import { useHistory } from "react-router-dom";
import AnimatedPages from "./components/UI/AnimatedPages";
import {
  deleteCurrentUser,
  sendCurrentUser,
  getCurrentUser,
} from "./redux/Actions/loginActions";

let isInitial = true;

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
  const [display, setDisplay] = useState("cards");
  const playlists = useSelector((state) => state.authentication.playlists);

  const songsList = useSelector((state) => state.songsList.songsList);
  const users = useSelector((state) => state.authentication.users);
  const openModal = useSelector((state) => state.playlist.openModal);
  const reduxCurrentUser = useSelector(
    (state) => state.authentication.currentUser
  );
  const currentUser = sessionStorage.getItem("currentUser");
  const [isLoggedLocal, setIsLoggedLocal] = useState("false");

  const setDisplayToList = () => {
    setDisplay("list");
  };
  const setDisplayToCards = () => {
    setDisplay("cards");
  };

  function logIn() {
    sessionStorage.setItem("isLogged", "true");
    setIsLoggedLocal("true");
    history.push("/songs");
  }
  function logOut() {
    sessionStorage.setItem("isLogged", "false");

    history.push("/Musify");
    sessionStorage.removeItem("currentUser");
    deleteCurrentUser(reduxCurrentUser);
  }

  useEffect(() => {
    if (sessionStorage.getItem("isLogged") === "false") {
      setIsLoggedLocal("false");
    }
  });

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
    if (sessionStorage.getItem("isLogged") === null) {
      sessionStorage.setItem("isLogged", "false");
    }
    setIsLoggedLocal(sessionStorage.getItem("isLogged"));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchMusicData(currentUser, songsList));
    }, 1);
    dispatch(fetchPlaylists(currentUser, playlists));
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(updateMusicData(users));
    dispatch(updatePlaylistData(users));
  }, [users, dispatch]);

  useEffect(() => {
    getUsersFromDatabase().then((data) => {
      if (data === null) {
        return;
      }
      dispatch(authActions.setUserListOnStart(data));
    });
  }, []);
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

              <AnimatedPages>
                <Button styles="button--log-out" onClick={logOut}>
                  Log Out
                </Button>
              </AnimatedPages>
              {(location.pathname === "/songs" ||
                location.pathname === "/songs/") && (
                <ChangeSongsDisplay
                  setCards={setDisplayToCards}
                  setList={setDisplayToList}
                />
              )}

              <Route path="/" exact>
                <Redirect to="/Musify/" />
              </Route>
              <Route path="/songs">
                <MusicPage display={display} />
              </Route>
              <Route path="/playlists">
                <PlaylistPage />
              </Route>
              <Route path="/settings">
                <SettingsPage />
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
