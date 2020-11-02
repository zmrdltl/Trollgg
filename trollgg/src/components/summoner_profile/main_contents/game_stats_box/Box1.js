import React, { useEffect, useState } from "react";
import * as Test from "../../../test";
import { CircleProgress } from "react-gradient-progress";

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
      const championId = oneGame.participants[j].championId;
      if (
        oneGame.participantIdentities[j].player.summonerName === summonerName
      ) {
        const obj = {
          teamId: teamId,
          win: win,
          kills: kills,
          deaths: deaths,
          assists: assists,
          championId: championId,
        };

        infoPerGame.push(obj);
        break;
      }
    }
  }

  return infoPerGame;
};

const getTeamInfoPerGame = (match20GameInfoRes) => {
  const teamsInfo = [];

  for (let i = 0; i < match20GameInfoRes.length; i++) {
    const oneGame = match20GameInfoRes[i];
    const objTeam = [
      { totalKills: 0, totalDeaths: 0, totalAssists: 0 },
      { totalKills: 0, totalDeaths: 0, totalAssists: 0 },
    ];
    for (let j = 0; j < 10; j++) {
      const kills = oneGame.participants[j].stats.kills;
      const assists = oneGame.participants[j].stats.assists;
      const deaths = oneGame.participants[j].stats.deaths;
      if (0 <= j && j <= 4) {
        objTeam[0].totalKills += kills;
        objTeam[0].totalDeaths += deaths;
        objTeam[0].totalAssists += assists;
      } else {
        objTeam[1].totalKills += kills;
        objTeam[1].totalDeaths += deaths;
        objTeam[1].totalAssists += assists;
      }
    }
    teamsInfo.push(objTeam);
  }
  return teamsInfo;
};

const getWinLost = (infoPerGame) => {
  let winCnt = 0;
  let lostCnt = 0;
  for (let i = 0; i < infoPerGame.length; i++) {
    if (infoPerGame[i].win === "Fail") lostCnt++;
    else winCnt++;
  }
  const winRate = [winCnt, lostCnt];
  return winRate;
};

const getAvgKDA = (infoPerGame) => {
  let avgKills = 0;
  let avgDeaths = 0;
  let avgAssists = 0;
  for (let i = 0; i < infoPerGame.length; i++) {
    avgKills += infoPerGame[i].kills;
    avgDeaths += infoPerGame[i].deaths;
    avgAssists += infoPerGame[i].assists;
  }
  const KDA = [
    Math.round((avgKills / 20) * 10) / 10,
    Math.round((avgDeaths / 20) * 10) / 10,
    Math.round((avgAssists / 20) * 10) / 10,
  ];
  return KDA;
};

const getAvgKillContributionRate = (teamInfoPerGame, infoPerGame) => {
  let killRate = 0;
  //i번째 경기의 team별 kda를 찾아서 내 kda의 킬 관여율을 구한다.
  for (let i = 0; i < infoPerGame.length; i++) {
    const myTeamId = infoPerGame[i].teamId;
    const myKills = infoPerGame[i].kills;
    const myAssists = infoPerGame[i].assists;
    let teamTotalKills = 1;
    if (teamInfoPerGame[i][parseInt(myTeamId / 100) - 1].totalKills)
      teamTotalKills =
        teamInfoPerGame[i][parseInt(myTeamId / 100) - 1].totalKills;
    killRate += ((myKills + myAssists) / teamTotalKills) * 100;
  }

  return Math.round(killRate / teamInfoPerGame.length);
};

const Box1 = (props) => {
  const { match20GameInfoRes, summonerRes } = props;
  const [infoPerGame, setInfoPerGame] = useState([]);
  const [teamInfoPerGame, setTeamInfoPerGame] = useState([]);
  const [winLost, setWinLost] = useState([]);
  const [KDA, setKDA] = useState(0);
  const [killRate, setKillRate] = useState(0);
  const summonerName = summonerRes.name;
  const winRate = parseInt((winLost[0] / (winLost[0] + winLost[1])) * 100);

  useEffect(() => {
    const infoPerGame = getInfoPerGame(match20GameInfoRes, summonerName);

    const win = getWinLost(infoPerGame);
    const KDA = getAvgKDA(infoPerGame);
    const teamInfoPerGame = getTeamInfoPerGame(match20GameInfoRes);
    const killRate = getAvgKillContributionRate(teamInfoPerGame, infoPerGame);
    setInfoPerGame(infoPerGame);
    setTeamInfoPerGame(teamInfoPerGame);
    setWinLost(win);
    setKDA(KDA);
    setKillRate(killRate);
  }, [match20GameInfoRes, summonerName]);

  console.log("승률", winRate);
  console.log("소환사이름!!", summonerName);
  console.log("game INFO!", infoPerGame);
  console.log("teams INFO!", teamInfoPerGame);
  console.log("최근 20경기의 목록 ", match20GameInfoRes);
  console.log("KDA!!", KDA);
  console.log("킬 관여율", killRate);

  return (
    <div style={styles.container}>
      <div style={{ height: "100%" }}>
        <div style={styles.title}>{`20전 ${winLost[0]}승 ${winLost[1]}패`}</div>
        <div style={styles.graph}>
          <CircleProgress
            width={90}
            height={90}
            percentage={winRate}
            primaryColor={["#00BBFF", "#92d7f1"]}
            secondaryColor={"#ff0000"}
            strokeWidth={9}
          />
        </div>
      </div>
      <div style={styles.status}>
        <div style={styles.text}>
          <div style={styles.smallText} title="평균 KDA">
            <div>{`${KDA[0]} / `}</div>
            <div style={{ color: "#ff0000" }}>&nbsp;{KDA[1]}&nbsp;</div>
            <div>{`/ ${KDA[2]}`}</div>
          </div>
          <div style={styles.normalText}>
            <div>
              {`${Math.round(((KDA[0] + KDA[2]) / KDA[1]) * 100) / 100}`}&nbsp;
            </div>
            <div style={{ color: "#ff0000" }}>{`(${killRate})%`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box1;

const styles = {
  container: {
    display: "flex",
    width: "230px",
    fontSize: "15px",
    verticalAlign: "top",
    justifyContent: "center",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    padding: "5px 0 14px 0px",
    lineHeight: "14px",
    fontSize: "12px",
    color: "#666",
    height: "14px",
    borderLeft: "1px solid #cdd2d2",
  },
  graph: {
    position: "relative",
    width: "90",
    height: "90",
    overflow: "hidden",
    textAlign: "left",
    lineHeight: "normal",
  },
  status: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "105px",
    height: "108px",
  },
  text: {
    display: "block",
  },
  smallText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "7px",
  },
  normalText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
  },
};
