import React, { useState, useEffect } from "react";
import HeaderBox from "./HeaderBox";
import GameStatsBox from "./game_stats_box/GameStatsBox";
import GameAndItemList from "./GameAndItemList";
import * as API from "../../../api/API";

const getInfoPerGame = async (match20GameInfoRes, summonerName) => {
  const infoPerGame = [];
  for (let i = 0; i < match20GameInfoRes.length; i++) {
    const oneGame = match20GameInfoRes[i];
    for (let j = 0; j < 10; j++) {
      const teamId = oneGame.participants[j].teamId;
      const win = oneGame.teams[parseInt(teamId / 100) - 1].win;
      const kills = oneGame.participants[j].stats.kills;
      const assists = oneGame.participants[j].stats.assists;
      const deaths = oneGame.participants[j].stats.deaths;

      if (
        oneGame.participantIdentities[j].player.summonerName === summonerName
      ) {
        const obj = {
          teamId: teamId,
          win: win,
          kills: kills,
          deaths: deaths,
          assists: assists,
        };

        infoPerGame.push(obj);
        break;
      }
    }
  }
  return infoPerGame;
};

const MainContents = (props) => {
  const { summonerRes, leagueRes, match20GameInfoRes } = props;
  const [infoPerGame, setInfoPerGame] = useState([]);
  const summonerName = summonerRes.name;
  useEffect(() => {
    const infoPerGame = getInfoPerGame(match20GameInfoRes, summonerName);
    setInfoPerGame(infoPerGame);
  }, [match20GameInfoRes, summonerName]);
  // const matchRes = getMatchRes(props.gameId);
  // const {
  //   gameCreation,
  //   gameDuration,
  //   teams,
  //   participantIdentities,
  //   participants,
  // } = matchRes;
  //const timelines = await API.getRiotTimelines({ gameId });
  return (
    <div style={styles.container}>
      <HeaderBox />
      <GameStatsBox
        match20GameInfoRes={match20GameInfoRes}
        summonerRes={summonerRes}
        leagueRes={leagueRes}
      />
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
