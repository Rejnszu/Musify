import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import MusicPage from "./pages/musicPage";
import PlaylistPage from "./pages/playlistPage";

function App() {
  return (
    <React.Fragment>
      <Navigation />

      <Switch>
        <Route path="/" exact>
          <Redirect to="/Musify" />
        </Route>
        <Route path="/Musify">
          <MusicPage />
        </Route>
        <Route path="/playlists">
          <PlaylistPage />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
