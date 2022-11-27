import React, { useState, useEffect, useMemo } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { updateAllData } from "./actions/updateActions";
import { getUsersFromDatabase } from "./actions/authActions";
import { sendCurrentUser } from "./actions/loginActions";
import { routesHandler } from "./actions/additionalFunctions/routesHandler";

import { updateActions } from "./redux/update-slice";
import { authActions } from "./redux/auth-slice";

import LoggedInGroup from "./routeGroups/LoggedInGroup";
import LoggedOutGroup from "./routeGroups/LoggedOutGroup";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [firstPageLoad, setFirstPageLoad] = useState(true);

  const shouldUpdate = useSelector((state) => state.update.shouldUpdate);
  const users = useSelector((state) => state.authentication.users);

  const currentUser = useMemo(
    () =>
      users.find(
        (user) => user.userName === sessionStorage.getItem("currentUser")
      ),
    [users]
  );

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
    routesHandler(location, history);
  }, [location]);

  return (
    <Switch location={location} key={location.pathname}>
      <Route path="/Musify">
        <LoggedOutGroup />
      </Route>
      <LoggedInGroup onLogOut={setFirstPageLoad.bind(null, true)} />
    </Switch>
  );
}

export default App;
