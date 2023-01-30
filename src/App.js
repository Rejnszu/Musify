import React from "react";

import LoggedInGroup from "./routeGroups/LoggedInGroup";
import LoggedOutGroup from "./routeGroups/LoggedOutGroup";
import useUpdate from "./hooks/useUpdate";
import SecureGuard from "./pages/SecureGuard";

function App() {
  const update = useUpdate();
  const isLogged = sessionStorage.getItem("isLogged");
  if (isLogged === null) sessionStorage.setItem("isLogged", "false");

  return (
    <SecureGuard>
      <LoggedOutGroup />
      <LoggedInGroup />
    </SecureGuard>
  );
}

export default App;
