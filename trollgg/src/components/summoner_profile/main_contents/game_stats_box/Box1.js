import React, { useEffect, useState } from "react";
import * as Test from "../../../test";

const getWinInfoPerGame = (match20GameInfoRes, summonerName) => {
  const winInfoPerGame = [];
  console.log(match20GameInfoRes.length);
  for (let i = 0; i < match20GameInfoRes.length; i++) {
    const oneGame = match20GameInfoRes[i];

    for (let j = 0; j < 10; j++) {
      if (
        oneGame.participantIdentities[j].player.summonerName === summonerName
      ) {
        let teamId = 0;
        if (0 <= j && j <= 4) teamId = 100;
        else teamId = 200;
        winInfoPerGame.push(oneGame.teams[parseInt(teamId / 100) - 1].win);
        break;
      }
    }
  }
  return winInfoPerGame;
};
const getWinLost = (match20GameInfoRes, summonerName) => {
  const winInfoPerGame = getWinInfoPerGame(match20GameInfoRes, summonerName);
  let winCnt = 0;
  let lostCnt = 0;
  for (let i = 0; i < winInfoPerGame.length; i++) {
    if (winInfoPerGame[i] === "Fail") lostCnt++;
    else winCnt++;
  }
  const winRate = [winCnt, lostCnt];
  console.log(winRate);
  return winRate;
};
const Box1 = (props) => {
  const { match20GameInfoRes, summonerRes } = props;
  const [winLost, setWinLost] = useState([]);
  const summonerName = summonerRes.name;
  console.log("소환사이름!!", summonerName);
  console.log("최근 20경기의 목록 ", match20GameInfoRes);

  useEffect(() => {
    const win = getWinLost(match20GameInfoRes, summonerName);
    setWinLost(win);
  }, [match20GameInfoRes, summonerName]);

  return (
    <div style={styles.container}>
      <div style={styles.title}> {`20전 ${winLost[0]}승 ${winLost[1]}패`} </div>
    </div>
  );
};

export default Box1;

const styles = {
  container: {
    display: "inline-block",
    width: "230px",
    fontSize: "15px",
    verticalAlign: "top",
  },
  title: {
    padding: "16px 0 14px 20px",
    lineHeight: "14px",
    fontSize: "12px",
    color: "#666",
    height: "14px",
    borderLeft: "1px solid #cdd2d2",
  },
};
