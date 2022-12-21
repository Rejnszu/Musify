import React from "react";
import styles from "./Charts.module.scss";
import Loader from "../UI/utils/Loader";
import ChartsItem from "./ChartsItem";
import EmptyList from "../UI/utils/EmptyList";
import { useGetTopSongsQuery } from "../../redux/api/songsApi";

const Charts = () => {
  const { data, isError, isLoading } = useGetTopSongsQuery(25);

  const charts = data?.tracks.track;

  if (isError) {
    return <EmptyList>Couldn't fetch top charts.</EmptyList>;
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <ul className={styles.charts}>
      {charts?.map((track, i) => {
        return (
          <ChartsItem name={track.name} artist={track.artist.name} key={i} />
        );
      })}
    </ul>
  );
};

export default Charts;
