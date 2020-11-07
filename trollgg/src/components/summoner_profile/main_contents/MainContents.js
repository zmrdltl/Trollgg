import React, { useState, useEffect } from "react";
import HeaderBox from "./HeaderBox";
import GameStatsBox from "./game_stats_box/GameStatsBox";
import GameAndItemList from "./GameAndItemList";
import * as API from "../../../api/API";

const MainContents = (props) => {
  const { summonerRes, leagueRes, match20GameInfoRes } = props;

  return (
    <div style={styles.container}>
      <HeaderBox />
      <GameStatsBox
        match20GameInfoRes={match20GameInfoRes}
        summonerRes={summonerRes}
        leagueRes={leagueRes}
      />
      <GameAndItemList
        match20GameInfoRes={match20GameInfoRes}
        summonerRes={summonerRes}
      />
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
