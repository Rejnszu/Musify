import React, { useEffect } from "react";

import LoggedInGroup from "./routeGroups/LoggedInGroup";
import LoggedOutGroup from "./routeGroups/LoggedOutGroup";
import useUpdate from "./hooks/useUpdate";
import { useGetUsersDataQuery } from "./redux/api/dataApiSlice";

function App() {
  const { data } = useGetUsersDataQuery();
  const update = useUpdate();

  useEffect(() => {
    if (sessionStorage.getItem("isLogged") === null) {
      sessionStorage.setItem("isLogged", "false");
    }
  }, []);

  return (
    <React.Fragment>
      <LoggedOutGroup />
      <LoggedInGroup />
    </React.Fragment>
  );
}

export default App;
