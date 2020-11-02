import React, { useState, useEffect } from "react";

const getInfoPerGame = (match20GameInfoRes, summonerName) => {
  const infoPerGame = [];

  for (let i = 0; i < match20GameInfoRes.length; i++) {
    const oneGame = match20GameInfoRes[i];
    for (let j = 0; j < 10; j++) {
      const win = oneGame.participants[j].stats.win === true ? 1 : 0;
      const lane = oneGame.participants[j].timeline.lane;
      const role = oneGame.participants[j].timeline.role;
      if (
        oneGame.participantIdentities[j].player.summonerName === summonerName
      ) {
        let obj = {
          lane: lane,
          role: role,
          win: win,
        };
        infoPerGame.push(obj);
        break;
      }
    }
  }
  return infoPerGame;
};

const getPreferPositionInfo = (infoPerGame) => {
  const playedPosition = new Map([]);
  for (let i = 0; i < infoPerGame.length; i++) {
    const role = infoPerGame[i].role;
    const isWin = infoPerGame[i].win;
    const lane = infoPerGame[i].lane;
    if (!playedPosition.get(lane)) {
      playedPosition.set(lane, {
        role: role,
        lane: lane,
        played: 1,
        win: isWin,
      });
    } else {
      const onePosInfo = playedPosition.get(lane);
      onePosInfo.played += 1;
      onePosInfo.win += isWin;
    }
  }

  const temp = [];
  const preferPositionInfo = [];
  let played = 0;
  let win = 0;
  playedPosition.forEach((value) => {
    if (value.role === "DUO_SUPPORT" && value.lane === "NONE") {
      played = value.played;
      win = value.win;
    } else temp.push(value);
  });

  for (let i = 0; i < temp.length; i++) {
    if (temp[i].role === "DUO_SUPPORT" && temp[i].lane === "BOTTOM") {
      temp[i].played += played;
      temp[i].win += win;
    }
    preferPositionInfo.push(temp[i]);
  }
  preferPositionInfo.sort((a, b) => {
    if (a.played === b.played) return b.win - a.win;
    return b.played - a.played;
  });
  return preferPositionInfo;
};

const showPreferPosition = (preferPositionInfo, tier) => {
  const getKoreanLaneName = (lane) => {
    if (lane === "DUO_SUPPORT") return "서포터";
    if (lane === "MIDDLE") return "미드";
    if (lane === "TOP") return "탑";
    if (lane === "JUNGLE") return "정글";
    return "원딜";
  };
  const getLane = (onePreferPositionInfo) => {
    const lane = onePreferPositionInfo.lane;
    const role = onePreferPositionInfo.role;
    if (lane === "NONE") {
      if (role === "DUO_SUPPORT") return "DUO_SUPPORT";
      if (role === "DUO" || role === "DUO_CARRY") return "BOTTOM";
      return role;
    }
    return lane;
  };
  const makePreferPosition = () => {
    const statList = [];
    let idx = 0;

    const styles = {
      container: {
        display: "block",
        width: "230px",
        fontSize: "15px",
        verticalAlign: "top",
      },
      status: {
        display: "flex",
        marginLeft: "20px",
        alignItems: "center",
        marginBottom: "10px",
      },
      title: {
        display: "flex",
        padding: "10px 0 14px 20px",
        alignItems: "center",
        lineHeight: "14px",
        fontSize: "12px",
        color: "#666",
        height: "14px",
        borderLeft: "1px solid #cdd2d2",
      },
      image: {
        display: "inline-block",
        width: "36px",
        lineHeight: "34px",
        verticalAlign: "middle",
        textAlign: "center",
        marginRight: "10px",
      },
      positionName: {
        lineHeight: "16px",
        fontSize: "14px",
        color: "#333",
        marginBottom: "4px",
      },
      roleRate: {
        lineHeight: "12px",
        fontSize: "11px",
        color: "#1f8ecd",
      },
      winRate: {
        color: "#333",
        fontSize: "11px",
      },
      line: {
        display: "inline-block",
        marginLeft: "6px",
        marginRight: "6px",
        content: "",
        borderLeft: "1px solid #cdd2d2",
        height: "12px",
        verticalAlign: "middle",
      },
    };
    for (let i = 0; i < preferPositionInfo.length; i++) {
      idx += 1;
      if (idx === 3) break;
      const lane = getLane(preferPositionInfo[i]);
      const koLane = getKoreanLaneName(lane);
      const win = preferPositionInfo[i].win;
      const played = preferPositionInfo[i].played;
      statList.push(
        <div style={styles.container} key={idx}>
          {i === 0 ? <div style={styles.title}>선호 포지션(랭크)</div> : ""}

          <div style={styles.status}>
            <div style={styles.image}>
              <img
                style={styles.image}
                src={require(`../../../../assets/ranked_positions/${tier}_${lane}.png`)}
                alt="pos"
              />
            </div>
            <div style={{ display: "block" }}>
              <div style={styles.positionName}>{koLane}</div>
              <span style={styles.roleRate}>{`${played * 5}%`}</span>
              <span style={styles.line}></span>
              <span style={styles.winRate}>{`승률 ${Math.round(
                (win / played) * 100
              )}%`}</span>
            </div>
          </div>
        </div>
      );
    }
    return statList;
  };
  return <div>{makePreferPosition().map((val) => val)}</div>;
};
const Box3 = (props) => {
  const { match20GameInfoRes, summonerRes, leagueRes } = props;
  const [rank, setRank] = useState("");
  const [tier, setTier] = useState("");
  const [infoPerGame, setInfoPerGame] = useState([]);
  const [preferPositionInfo, setPreferPositionInfo] = useState([]);
  useEffect(() => {
    const summonerName = summonerRes.name;
    const infoPerGame = getInfoPerGame(match20GameInfoRes, summonerName);
    const preferPositionInfo = getPreferPositionInfo(infoPerGame);
    const rank = leagueRes.rank;
    const tier = leagueRes.tier;
    setRank(rank);
    setTier(tier);
    setInfoPerGame(infoPerGame);
    setPreferPositionInfo(preferPositionInfo);
  }, [leagueRes, match20GameInfoRes, summonerRes.name]);
  console.log("20게임 라인", infoPerGame);
  console.log("선호포지션", preferPositionInfo);
  console.log("리그정보", leagueRes);
  console.log("랭크", rank);
  console.log("티어", tier);
  return showPreferPosition(preferPositionInfo, tier);
};

export default Box3;
