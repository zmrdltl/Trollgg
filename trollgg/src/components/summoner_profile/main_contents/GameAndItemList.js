import React from "react";
import * as Index from "../../../assets/index";

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

const showStats = (match20GameInfoRes, summonerName, champList, styles) => {
  const infoPerGame = getInfoPerGame(
    match20GameInfoRes,
    summonerName,
    champList
  );
  console.log("인포 퍼 게임", infoPerGame);

  const getCurrentTime = (gameCreation) => {
    const currentDate = new Date();
    const gapTime = currentDate - gameCreation;
    console.log(currentDate, gapTime);
    return new Date();
  };

  const getMatchText = (queueId) => {
    if (queueId === 420) return "솔랭";
    else return "나머지";
  };

  const getGameDurationTime = (gameDuration) => {
    let duration = gameDuration;
    const hour = parseInt(duration / 3600);
    duration %= parseInt(3600);
    const minute = parseInt(duration / 60);
    const second = duration % 60;
    if (hour) return `${hour}시 ${minute}분 ${second}초`;
    return `${minute}분 ${second}초`;
  };

  const getWinOrFailText = (win) => {
    if (win === "Win") return "승리";
    return "패배";
  };
  const getResultFont = (win) => {
    if (win === "Win") return "#1a78ae";
    return "c6443e";
  };

  const makeStats = () => {
    const statList = [];
    for (let i = 0; i < match20GameInfoRes.length; i++) {
      const gameDuration = match20GameInfoRes[i].gameDuration;
      const gameCreation = match20GameInfoRes[i].gameCreation;
      const queueId = match20GameInfoRes[i].queueId;

      const kills = infoPerGame[i].kills;
      const deaths = infoPerGame[i].deaths;
      const assists = infoPerGame[i].assists;
      const koChampName = infoPerGame[i].koChampName;
      const enChampName = infoPerGame[i].enChampName;
      const win = infoPerGame[i].win;
      statList.push(
        <div style={styles.container} key={i}>
          <div style={styles.gameStats}>
            <div style={styles.gameType}>{getMatchText(queueId)}</div>
            <div>시간</div>
            <div style={styles.statBar} />
            <div style={{ color: getResultFont(win) }}>
              {getWinOrFailText(win)}
            </div>
            <div>{getGameDurationTime(gameDuration)}</div>
          </div>

          <div style={styles.gameSettingInfo}>
            <div style={styles.picture}>
              <div>
                <img
                  alt="챔프사진"
                  style={styles.champImage}
                  src={`https://opgg-static.akamaized.net/images/lol/champion/${enChampName}.png?image=q_auto,w_46&v=1603864069`}
                ></img>
              </div>
              <div style={styles.spell}>
                <div>
                  <img
                    alt="챔프사진"
                    style={styles.champImage}
                    src={`https:////opgg-static.akamaized.net/images/lol/spell/SummonerDot.png?image=q_auto,w_22&v=1603864069`}
                  ></img>
                </div>
                <div> 스2 </div>
              </div>
              <div style={styles.runes}>
                <div> 룬1 </div>
                <div> 룬2 </div>
              </div>
            </div>
            <div style={styles.champName}>{koChampName}</div>
          </div>

          <div style={styles.KDABox}>
            <span> {`${kills} /`} </span>
            <span> {`${deaths} /`} </span>
            <span> {`${assists}`} </span>
            <div> 7:25:1 평점</div>
          </div>

          <div style={styles.stats}>
            <div>레벨 15</div>
            <div>cs</div>
            <div>킬관여</div>
            <div>매치 평균</div>
            <div>silver 4</div>
          </div>

          <div style={styles.items}>
            <div>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
            </div>

            <div>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
            </div>

            <div>제어와드</div>
          </div>
          <div style={styles.team100}>
            <div style={{ display: "flex" }}>
              <div>img</div>
              <div>name</div>
            </div>
          </div>
          <div style={styles.team200}>
            <div style={{ display: "flex" }}>
              <div>img</div>
              <div>name</div>
            </div>
          </div>
        </div>
      );
    }
    return statList;
  };
  return <div>{makeStats().map((e) => e)}</div>;
};

const GameAndItemList = (props) => {
  const { match20GameInfoRes, summonerRes } = props;
  const summonerName = summonerRes.name;
  const champList = Index.champList;
  const spellList = Index.spellList;
  console.log(spellList);
  return showStats(match20GameInfoRes, summonerName, champList, styles);
};

export default GameAndItemList;

const styles = {
  container: {
    display: "flex",
    alignItems: "center", //세로 중앙 정렬
    border: "1px solid #cdd2d2",
    boxShadow: "0 1px #dcdfdf",
    background: "#f2f2f2",
    borderRadius: "2px",
    width: "690px",
    marginTop: "10px",
  },
  gameStats: {
    width: "70px",
    display: "block",
    textAlign: "center",
    fontSize: "11px",
    color: "#555",
    lineHeight: "16px",
  },
  gameType: {
    fontWeight: "bold",
    width: "70px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  champImage: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
  },
  spell: {
    width: "22px",
    height: "48px",
    display: "block",
  },
  gameSettingInfo: {
    width: "100px",
    display: "block",
  },
  picture: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  runes: {
    width: "22px",
    height: "48px",
    display: "block",
  },
  champName: {
    marginTop: "8px",
    fontSize: "11px",
    color: "#555",
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  KDABox: {
    display: "block",
    width: "114px",
    fontSize: "11px",
    textAlign: "center",
  },
  stats: {
    display: "block",
    width: "90px",
  },
  items: {
    display: "block",
    width: "114px",
  },
  team100: {
    display: "block",
    width: "170px",
  },
  team200: {
    display: "block",
    width: "170px",
  },
  statBar: {
    display: "block",
    width: "27px",
    margin: "5px auto",
    height: "2px",
    background: "#cdd2d2",
  },
};
