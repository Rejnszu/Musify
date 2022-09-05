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
import { fetchMusicData, updateMusicData } from "./redux/Actions/musicActions";
import WelcomePage from "./pages/WelcomePage";
import { authActions } from "./redux/auth-slice";
import { getUsersFromDatabase } from "./redux/Actions/authActions";
import { useHistory } from "react-router-dom";
import AnimatedPages from "./components/UI/AnimatedPages";
import {
  deleteCurrentUser,
  sendCurrentUser,
} from "./redux/Actions/loginActions";
import SettingsPage from "./pages/SettingsPage";
import { getCurrentUser } from "./redux/Actions/loginActions";
let isInitial = true;

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
  const [display, setDisplay] = useState("cards");

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

  function setInitialSongsList() {
    dispatch(songsActions.resetSongList());
  }
  function logIn() {
    sessionStorage.setItem("isLogged", "true");
    setIsLoggedLocal("true");
    history.push("/songs");
  }
  function logOut() {
    sessionStorage.setItem("isLogged", "false");
    setIsLoggedLocal("false");
    history.push("/Musify");
    sessionStorage.removeItem("currentUser");
    deleteCurrentUser(reduxCurrentUser);
  }

  useEffect(() => {
    if (sessionStorage.getItem("isLogged") === "true") {
      const user = users.find((user) => user?.userName === currentUser);
      sendCurrentUser(user).then(() => {
        getCurrentUser(user).then((data) => {
          dispatch(authActions.setCurrentUser(data));
        });
      });
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
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(updateMusicData(users));
  }, [users, dispatch]);

  useEffect(() => {
    getUsersFromDatabase().then((data) => {
      if (data === null) {
        return;
      }
      dispatch(authActions.setUserListOnStart(data));
      console.log(data);
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
              {/* <Button onClick={setInitialSongsList}>Reset</Button> */}
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
