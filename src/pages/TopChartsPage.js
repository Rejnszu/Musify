import React from "react";
import Charts from "../components/Charts/Charts";
import AnimatedPages from "../components/UI/FramerGenerals/AnimatedPages";

const TopChartsPage = () => {
  return (
    <AnimatedPages>
      <main>
        <Charts />
      </main>
    </AnimatedPages>
  );
};

export default TopChartsPage;
