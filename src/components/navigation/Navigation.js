import React from "react";
import NavigationMobile from "./NavigationMobile";
import NavigationDesktop from "./NavigationDesktop";
import useMobile from "../../hooks/useMobile";

const Navigation = () => {
  const isMobile = useMobile(1300);
  return isMobile ? <NavigationMobile /> : <NavigationDesktop />;
};

export default Navigation;
