export const routesHandler = (location, history) => {
  if (
    sessionStorage.getItem("isLogged") === "false" &&
    location.pathname !== "/Musify"
  ) {
    history.push("/Musify");
  }
};
