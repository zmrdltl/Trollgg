import React from "react";
import * as Test from "../../../test";

const getInfoPerGame = (match20GameInfoRes, summonerName) => {
  const infoPerGame = [];
  const d = () => {
    a = Array(3, 0);
    console.log(Array);
    return map((v, i) => {
      console.log;
    });
  };
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

const Box2 = (props) => {
  const { match20GameInfoRes, summonerRes } = props;
  console.log("BOX2", match20GameInfoRes, summonerRes);
  return (
    <div style={styles.container}>
      <div style={styles.stat}>
        <div style={styles.champImage}>사진</div>
        <div style={{ display: "block" }}>
          <div>챔프명</div>
          <div>승률 kda 평점</div>
        </div>
      </div>
    </div>
  );
};

export default Box2;

const styles = {
  container: {
    display: "block",
    width: "230px",
    fontSize: "15px",
    verticalAlign: "top",
  },
  stat: {
    display: "flex",
    justifyContent: "center",
  },
  champImage: {
    height: "34px",
    width: "34px",
  },
};
