import React from "react";
import MusicCard from "../components/music card/MusicCard";
import Overlay from "../components/UI/Overlay";

export default function MusicPage() {
  return (
    <Overlay>
      <MusicCard />
    </Overlay>
  );
}
