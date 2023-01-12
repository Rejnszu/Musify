import React from "react";

import LoggedInGroup from "./routeGroups/LoggedInGroup";
import LoggedOutGroup from "./routeGroups/LoggedOutGroup";
import useUpdate from "./hooks/useUpdate";
import { useSelector } from "react-redux";
function App() {
  const update = useUpdate();
  const musicList = useSelector((state) => state.songsList.songsList);
  console.log(musicList);
  if (sessionStorage.getItem("isLogged") === null)
    sessionStorage.setItem("isLogged", "false");

  return (
    <React.Fragment>
      <LoggedOutGroup />
      <LoggedInGroup />
    </React.Fragment>
  );
}

export default App;
