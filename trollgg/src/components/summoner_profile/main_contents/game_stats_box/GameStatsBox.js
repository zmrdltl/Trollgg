import React from "react";
import Box1 from "./Box1";
import Box2 from "./Box2";
import Box3 from "./Box3";
const getInfoPerGame = (match20GameInfoRes, summonerName) => {
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
const GameStatsBox = (props) => {
  const { match20GameInfoRes, summonerRes, infoPerGame } = props;
  console.log("gameStatsBox", infoPerGame);
  return (
    <div style={styles.container}>
      <Box1 match20GameInfoRes={match20GameInfoRes} summonerRes={summonerRes} />
      <div style={styles.verticalLine} />
      <Box2 match20GameInfoRes={match20GameInfoRes} summonerRes={summonerRes} />
      <div style={styles.verticalLine} />
      <Box3 match20GameInfoRes={match20GameInfoRes} summonerRes={summonerRes} />
    </div>
  );
};

export default GameStatsBox;

const styles = {
  container: {
    display: "flex",
    alignItems: "center", //세로 중앙 정렬
    border: "1px solid #cdd2d2",
    boxShadow: "0 1px #dcdfdf",
    background: "#f2f2f2",
    borderRadius: "2px",
    width: "690px",
    height: "153px",
  },
  font: {
    padding: "10px",
    fontSize: "15px",
    color: "#1f82cd",
  },
  verticalLine: {
    width: "1px",
    backgroundColor: "#CDD2D2",
    height: "100%",
    float: "left",
  },
};
