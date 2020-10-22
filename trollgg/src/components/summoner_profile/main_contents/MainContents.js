import React from "react";
import HeaderBox from "./HeaderBox";
import GameStatsBox from "./game_stats_box/GameStatsBox";
import GameAndItemList from "./GameAndItemList";
const MainContents = (props) => {
  return (
    <div style={styles.container}>
      <HeaderBox />
      <GameStatsBox />
      <GameAndItemList />
    </div>
  );
};

export default MainContents;

const styles = {
  container: {
    display: "inline-block",
    width: "690px",
    fontSize: "15px",
    verticalAlign: "top",
  },
};
