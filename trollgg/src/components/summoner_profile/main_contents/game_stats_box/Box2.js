import React, { useState, useEffect } from "react";
import * as Index from "../../../../assets/index";

const setChampInfoPerGame = (obj, champList) => {
  const championId = obj.championId;
  for (let champName in champList.data) {
    if (parseInt(champList.data[champName].key) === championId) {
      obj.enChampName = champName;
      obj.koChampName = champList.data[champName].name;
      break;
    }
  }
};

const getInfoPerGame = (match20GameInfoRes, summonerName, champList) => {
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
        let obj = {
          teamId: teamId,
          win: win,
          kills: kills,
          deaths: deaths,
          assists: assists,
          championId: championId,
          enChampName: "",
          koChampName: "",
        };
        setChampInfoPerGame(obj, champList);
        infoPerGame.push(obj);
        break;
      }
    }
  }
  return infoPerGame;
};

const showStats = (champ3Info) => {
  const getWinFont = (winRate) => {
    if (0 <= winRate && winRate < 60) {
      return "#333333";
    }
    return "#c6443e";
  };
  const getKDAFont = (kda) => {
    if (0 <= kda && kda < 3) {
      return "#333333"; //검
    } else if (3 <= kda && kda < 4) {
      return "#2daf7f"; //초
    } else if (4 <= kda && kda < 5) {
      return "#1f8ecd"; //파
    } else {
      return "#e19205"; //노
    }
  };
  const makeStats = () => {
    const statList = [];
    let idx = 0;
    for (let i = 0; i < champ3Info.length; i++) {
      idx += 1;
      if (idx === 4) break;
      const champName = champ3Info[i].koChampName;
      const kills = champ3Info[i].kills;
      const deaths = champ3Info[i].deaths ? champ3Info[i].deaths : 1;
      const assists = champ3Info[i].assists;
      const played = champ3Info[i].played;
      const win = champ3Info[i].win;
      const winRate = Math.round((win / played) * 100);
      const KDA = Math.round(((kills + assists) / deaths) * 100) / 100;
      const winFont = getWinFont(winRate);
      const KDAFont = getKDAFont(KDA);
      statList.push(
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "34px",
              width: "34px",
              justifyContent: "center",
              alignItems: "center",
              margin: "2px 10px 0 0",
            }}
          >
            <img
              style={{ borderRadius: "50%" }}
              src={`https://opgg-static.akamaized.net/images/lol/champion/${champ3Info[i].enChampName}.png?image=q_auto,w_30&v=1603864069`}
            ></img>
          </div>
          <div style={{ display: "block", width: "150px" }}>
            <div style={{ fontSize: "14px" }}>{champName}</div>
            <div style={{ fontSize: "12px" }}>
              <span
                style={{ fontWeight: "bold", color: winFont }}
              >{`${winRate}% `}</span>
              <span>{`(${win}승 ${played - win}패)`}&nbsp;&nbsp;&nbsp;</span>
              <span
                style={{ fontWeight: "bold", color: KDAFont }}
              >{`${KDA} 평점`}</span>
            </div>
          </div>
        </div>
      );
    }
    return statList;
  };
  return <div>{makeStats().map((a) => a)}</div>;
};

const getChamp3Info = (infoPerGame) => {
  const playedChamp = new Map([]);

  for (let i = 0; i < infoPerGame.length; i++) {
    const championId = infoPerGame[i].championId;
    const isWin = infoPerGame[i].win === "Win" ? 1 : 0;
    const enChampName = infoPerGame[i].enChampName;
    const koChampName = infoPerGame[i].koChampName;
    const kills = infoPerGame[i].kills;
    const deaths = infoPerGame[i].deaths;
    const assists = infoPerGame[i].assists;
    if (!playedChamp.get(championId)) {
      playedChamp.set(championId, {
        championId: championId,
        enChampName: enChampName,
        koChampName: koChampName,
        played: 1,
        win: isWin,
        kills: kills,
        deaths: deaths,
        assists: assists,
      });
    } else {
      const oneChampInfo = playedChamp.get(championId);
      oneChampInfo.played += 1;
      oneChampInfo.win += isWin;
      oneChampInfo.kills += kills;
      oneChampInfo.deaths += deaths;
      oneChampInfo.assists += assists;
    }
  }
  const champ3Info = [];
  playedChamp.forEach((value) => {
    champ3Info.push(value);
  });
  champ3Info.sort((a, b) => {
    if (a.played === b.played) {
      if (a.win === b.win) {
        const aKDA = Math.round(((a.kills + a.assists) / a.deaths) * 100) / 100;
        const bKDA = Math.round(((b.kills + b.assists) / b.deaths) * 100) / 100;
        return bKDA - aKDA;
      }
      return b.win - a.win;
    }
    return b.played - a.played;
  });
  return champ3Info;
};

const Box2 = (props) => {
  const { match20GameInfoRes, summonerRes } = props;
  const [infoPerGame, setInfoPerGame] = useState([]);
  const [champ3Info, setChamp3Info] = useState([]);
  const champList = Index.champList;
  const summonerName = summonerRes.name;
  useEffect(() => {
    const infoPerGame = getInfoPerGame(
      match20GameInfoRes,
      summonerName,
      champList
    );
    const champ3Info = getChamp3Info(infoPerGame);
    setInfoPerGame(infoPerGame);
    setChamp3Info(champ3Info);
  }, [champList, match20GameInfoRes, summonerName]);

  console.log("BOX2", match20GameInfoRes, summonerRes);
  console.log("챔피언 리스트", champList);
  console.log("매 게임 정보", infoPerGame);
  console.log("3챔프 정보", champ3Info);

  return (
    <div style={styles.container}>
      <div style={styles.stat}>{showStats(champ3Info)}</div>
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
};
