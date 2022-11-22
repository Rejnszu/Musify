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
import { getUsersFromDatabase } from "./Actions/authActions";
import { sendCurrentUser } from "./Actions/loginActions";
import { RoutesHandler } from "./Actions/AdditionalFunctions/RoutesHandler";

import WelcomePage from "./pages/WelcomePage";
import MusicPage from "./pages/MusicPage";
import PlaylistPage from "./pages/PlaylistPage";
import SettingsPage from "./pages/SettingsPage";
import PlayerPage from "./pages/PlayerPage";
import NavigationMobile from "./components/Navigation/NavigationMobile";
import NavigationDesktop from "./components/Navigation/NavigationDesktop";

import AnimatedPages from "./components/UI/AnimatedPages";
import PlayerConsole from "./components/Player/PlayerConsole";
import LogOut from "./components/LoginForms/LogOut/LogOut";

import { updateActions } from "./redux/update-slice";
import { authActions } from "./redux/auth-slice";


function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1300);
  const [firstPageLoad, setFirstPageLoad] = useState(true);
  const playerCurrentSong = useSelector((state) => state.player.currentSong);
  const shouldUpdate = useSelector((state) => state.update.shouldUpdate);
  const users = useSelector((state) => state.authentication.users);

  const currentUser = useMemo(
    () =>
      users.find(
        (user) => user.userName === sessionStorage.getItem("currentUser")
      ),
    [users]
  );
  const isLogged = sessionStorage.getItem("isLogged");

  useEffect(() => {
    if (firstPageLoad) {
      getUsersFromDatabase()
        .then((data) => {
          if (data === null) {
            return;
          }
          dispatch(authActions.setUserListOnStart(data));

          setFirstPageLoad(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [dispatch]);

  useEffect(() => {
    if (shouldUpdate) {
      dispatch(updateAllData(users));

      if (sessionStorage.getItem("isLogged") === "true") {
        if (currentUser !== undefined) {
          sendCurrentUser(currentUser);
        }
      }
    }
    return () => {
      dispatch(updateActions.shouldNotUpdate());
    };
  }, [users, dispatch]);

  useEffect(() => {
    if (sessionStorage.getItem("isLogged") === null) {
      sessionStorage.setItem("isLogged", "false");
    }
  }, []);

  useEffect(() => {
    RoutesHandler(location, history);
  }, [location]);

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
          {(isLogged === "false" || isLogged === null) && (
            <Route path="/Musify">
              <WelcomePage />
            </Route>
          )}
          {isLogged === "true" && (
            <React.Fragment>
              {isMobile ? <NavigationMobile /> : <NavigationDesktop />}
              <AnimatedPages>
                <LogOut onLogOut={setFirstPageLoad.bind(null, true)} />
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
            </React.Fragment>
          )}
        </Switch>
      </React.Fragment>
    </AnimatePresence>
  );
}

export default App;
