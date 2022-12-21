import React from "react";
import Charts from "../components/Charts/Charts";
import AnimatedPages from "../components/UI/FramerGenerals/AnimatedPages";
import Header from "../components/UI/utils/Header";

const TopChartsPage = () => {
  return (
    <AnimatedPages>
      <main>
        <Header>Top songs this week!</Header>
        <Charts />
      </main>
    </AnimatedPages>
  );
};

export default TopChartsPage;
