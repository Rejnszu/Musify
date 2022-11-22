export const routesHandler = (location, history) => {
  if (
    sessionStorage.getItem("isLogged") === "true" &&
    location.pathname !== "/songs" &&
    location.pathname !== "/playlists" &&
    location.pathname !== "/settings" &&
    location.pathname !== "/player"
  ) {
    history.push("/songs");
  }
  if (
    sessionStorage.getItem("isLogged") === "false" &&
    location.pathname !== "/Musify"
  ) {
    history.push("/Musify");
  }
};
