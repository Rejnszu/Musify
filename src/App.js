import React from "react";

import LoggedInGroup from "./routeGroups/LoggedInGroup";
import LoggedOutGroup from "./routeGroups/LoggedOutGroup";
import useUpdate from "./hooks/useUpdate";

function App() {
  const update = useUpdate();

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
