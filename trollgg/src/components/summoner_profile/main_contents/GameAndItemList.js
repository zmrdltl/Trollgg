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
      const perk0 = oneGame.participants[j].stats.perk0;
      const champLevel = oneGame.participants[j].stats.champLevel;
      const perkSubStyle = oneGame.participants[j].stats.perkSubStyle;
      const item0 = oneGame.participants[j].stats.item0;
      const item1 = oneGame.participants[j].stats.item1;
      const item2 = oneGame.participants[j].stats.item2;
      const item3 = oneGame.participants[j].stats.item3;
      const item4 = oneGame.participants[j].stats.item4;
      const item5 = oneGame.participants[j].stats.item5;
      const item6 = oneGame.participants[j].stats.item6; //와드 아이템
      const visionWardsBoughtInGame =
        oneGame.participants[j].stats.visionWardsBoughtInGame;
      const totalMinionsKilled =
        oneGame.participants[j].stats.totalMinionsKilled;
      const neutralMinionsKilled =
        oneGame.participants[j].stats.neutralMinionsKilled;

      const championId = oneGame.participants[j].championId;
      const spell1 = oneGame.participants[j].spell1Id;
      const spell2 = oneGame.participants[j].spell2Id;
      const cs = totalMinionsKilled + neutralMinionsKilled;

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
          spell1: spell1,
          spell2: spell2,
          perk0: perk0,
          perkSubStyle: perkSubStyle,
          champLevel: champLevel,
          cs: cs,
          item0: item0,
          item1: item1,
          item2: item2,
          item3: item3,
          item4: item4,
          item5: item5,
          item6: item6,
          visionWardsBoughtInGame: visionWardsBoughtInGame,
        };
        setChampInfoPerGame(obj, champList);
        infoPerGame.push(obj);
        break;
      }
    }
  }
  return infoPerGame;
};

const getTeamProfile = (match20GameInfoRes, champList) => {
  const teamProfile = [];

  for (let i = 0; i < match20GameInfoRes.length; i++) {
    const oneGame = match20GameInfoRes[i];
    for (let j = 0; j < 10; j++) {
      const championId = oneGame.participants[j].championId;
      const summonerName = oneGame.participantIdentities[j].player.summonerName;
      let obj = {
        championId: championId,
        summonerName: summonerName,
        enChampName: "",
        koChampName: "",
      };
      setChampInfoPerGame(obj, champList);
      teamProfile.push(obj);
    }
  }
  return teamProfile;
};
const getGapTime = (gameCreation) => {
  const currentDate = Date.now();
  const gapTime = currentDate - gameCreation;
  const year = parseInt(gapTime / (1000 * 60 * 60 * 24 * 30 * 12));
  if (year) return `${year}년 전`;
  const month = parseInt(gapTime / (1000 * 60 * 60 * 24 * 30));
  if (month) return `${month}달 전`;
  const day = parseInt(gapTime / (1000 * 60 * 60 * 24));
  if (day) return `${day}일 전`;
  const hour = parseInt(gapTime / (1000 * 60 * 60));
  if (hour) return `${hour}시간 전`;
  const minute = parseInt(gapTime / (1000 * 60));
  if (minute) return `${minute}분 전`;
  const second = parseInt(gapTime / 1000);
  return `${second}초 전`;
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
  return "#c6443e";
};

const getResultBackground = (win) => {
  if (win === "Win") return "#a3cfec";
  return "#e2b6b3";
};

const getBarColor = (win) => {
  if (win === "Win") return "#99b9cf";
  return "#cea7a7";
};

const getKillRate = (teamInfoPerGame, oneGameInfo) => {
  const kills = oneGameInfo.kills;
  const assists = oneGameInfo.assists;
  const teamId = oneGameInfo.teamId;
  const totalTeamKills = teamInfoPerGame[parseInt(teamId / 100) - 1].totalKills;
  return Math.round(((kills + assists) / totalTeamKills) * 100);
};

const getSpellText = (oneGameInfo, spellList) => {
  const sList = [];
  for (let spellInfo in spellList.data) {
    if (parseInt(spellList.data[spellInfo].key) === oneGameInfo.spell1) {
      sList.push(spellInfo);
    }
  }
  for (let spellInfo in spellList.data) {
    if (parseInt(spellList.data[spellInfo].key) === oneGameInfo.spell2) {
      sList.push(spellInfo);
    }
  }
  return sList;
};

const getWardColor = (win) => {
  if (win === "Win") return "blue";
  return "red";
};

const showStats = (
  match20GameInfoRes,
  summonerName,
  champList,
  spellList,
  styles
) => {
  const infoPerGame = getInfoPerGame(
    match20GameInfoRes,
    summonerName,
    champList
  );
  const teamInfoPerGame = getTeamInfoPerGame(match20GameInfoRes);
  const teamProfile = getTeamProfile(match20GameInfoRes, champList);
  console.log("인포 퍼 게임", infoPerGame, teamInfoPerGame);
  console.log("팀 프로필", teamProfile);
  const makeStats = () => {
    const statList = [];
    for (let i = 0; i < match20GameInfoRes.length; i++) {
      const gameDuration = match20GameInfoRes[i].gameDuration;
      const gameCreation = match20GameInfoRes[i].gameCreation;
      const queueId = match20GameInfoRes[i].queueId;

      const kills = infoPerGame[i].kills;
      const deaths = infoPerGame[i].deaths;
      const assists = infoPerGame[i].assists;
      const perk0 = infoPerGame[i].perk0;
      const champLevel = infoPerGame[i].champLevel;
      const perkSubStyle = infoPerGame[i].perkSubStyle;
      const cs = infoPerGame[i].cs;
      const item0 = infoPerGame[i].item0;
      const item1 = infoPerGame[i].item1;
      const item2 = infoPerGame[i].item2;
      const item3 = infoPerGame[i].item3;
      const item4 = infoPerGame[i].item4;
      const item5 = infoPerGame[i].item5;
      const item6 = infoPerGame[i].item6;
      const visionWardsBoughtInGame = infoPerGame[i].visionWardsBoughtInGame;
      const avgKDA =
        deaths === 0
          ? "Perfect"
          : Math.round(((kills + assists) / deaths) * 100) / 100;
      const koChampName = infoPerGame[i].koChampName;
      const enChampName = infoPerGame[i].enChampName;
      const win = infoPerGame[i].win;
      const sList = getSpellText(infoPerGame[i], spellList);
      const playedTime = getGapTime(gameCreation);
      const csPerMinute = Math.round((cs / (gameDuration / 60)) * 10) / 10;
      const killRate = getKillRate(teamInfoPerGame[i], infoPerGame[i]);
      const wardColor = getWardColor(win);
      statList.push(
        <div
          style={{
            display: "flex",
            alignItems: "center", //세로 중앙 정렬
            border: "1px solid #cdd2d2",
            boxShadow: "0 1px #dcdfdf",
            borderRadius: "2px",
            background: getResultBackground(win),
            width: "690px",
            height: "97px",
            marginTop: "10px",
          }}
          key={i}
        >
          <div style={styles.gameStats}>
            <div style={styles.gameType}>{getMatchText(queueId)}</div>
            <div>{playedTime}</div>
            <div
              style={{
                display: "block",
                width: "27px",
                margin: "5px auto",
                height: "2px",
                background: getBarColor(win),
              }}
            />
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
                <div style={styles.spell1}>
                  <img
                    alt="스펠1사진"
                    src={`https://opgg-static.akamaized.net/images/lol/spell/${sList[0]}.png?image=q_auto,w_22&v=1603864069`}
                  ></img>
                </div>
                <div style={styles.spell1}>
                  <img
                    alt="스펠2사진"
                    src={`https://opgg-static.akamaized.net/images/lol/spell/${sList[1]}.png?image=q_auto,w_22&v=1603864069`}
                  ></img>
                </div>
              </div>
              <div style={styles.runes}>
                <div style={styles.rune1}>
                  <img
                    alt="룬1"
                    src={`https://opgg-static.akamaized.net/images/lol/perk/${perk0}.png?image=q_auto,w_22&v=1603864069`}
                  ></img>
                </div>
                <div style={styles.rune2}>
                  <img
                    alt="룬2"
                    src={`https://opgg-static.akamaized.net/images/lol/perkStyle/${perkSubStyle}.png?image=q_auto,w_22&v=1603864069`}
                  ></img>
                </div>
              </div>
            </div>
            <div style={styles.champName}>{koChampName}</div>
          </div>

          <div style={styles.KDABox}>
            <span> {`${kills} /`} </span>
            <span style={{ color: "#c6443e" }}> {`${deaths} `} </span>
            <span> {`/ ${assists}`} </span>
            <div style={styles.KDARatio}> {`${avgKDA} 평점`}</div>
          </div>

          <div style={styles.stats}>
            <div>{`레벨 ${champLevel}`}</div>
            <div>{`${cs} (${csPerMinute}) CS`}</div>
            <div style={{ color: "#c6443e" }}>{`킬관여 ${killRate}%`}</div>
          </div>

          <div style={styles.items}>
            <div>
              <span style={styles.item}>
                {item0 ? (
                  <img
                    alt="템1"
                    src={`https://opgg-static.akamaized.net/images/lol/item/${item0}.png?image=q_auto,w_22&v=1603864069`}
                  ></img>
                ) : (
                  <img
                    style={{ width: "22px", height: "22px" }}
                    alt="템1"
                    src={`https://opgg-static.akamaized.net/images/pattern/opacity.1.png`}
                  ></img>
                )}
              </span>
              <span style={styles.item}>
                {item1 ? (
                  <img
                    alt="템2"
                    src={`https://opgg-static.akamaized.net/images/lol/item/${item1}.png?image=q_auto,w_22&v=1603864069`}
                  ></img>
                ) : (
                  <img
                    style={{ width: "22px", height: "22px" }}
                    alt="템2"
                    src={`https://opgg-static.akamaized.net/images/pattern/opacity.1.png`}
                  ></img>
                )}
              </span>
              <span style={styles.item}>
                {item2 ? (
                  <img
                    alt="템3"
                    src={`https://opgg-static.akamaized.net/images/lol/item/${item2}.png?image=q_auto,w_22&v=1603864069`}
                  ></img>
                ) : (
                  <img
                    style={{ width: "22px", height: "22px" }}
                    alt="템3"
                    src={`https://opgg-static.akamaized.net/images/pattern/opacity.1.png`}
                  ></img>
                )}
              </span>
              <span style={styles.item}>
                {item6 ? (
                  <img
                    alt="템7"
                    src={`https://opgg-static.akamaized.net/images/lol/item/${item6}.png?image=q_auto,w_22&v=1603864069`}
                  ></img>
                ) : (
                  <img
                    style={{ width: "22px", height: "22px" }}
                    alt="템7"
                    src={`https://opgg-static.akamaized.net/images/pattern/opacity.1.png`}
                  ></img>
                )}
              </span>
            </div>

            <div>
              <span style={styles.item}>
                {item3 ? (
                  <img
                    alt="템3"
                    src={`https://opgg-static.akamaized.net/images/lol/item/${item3}.png?image=q_auto,w_22&v=1603864069`}
                  ></img>
                ) : (
                  <img
                    style={{ width: "22px", height: "22px" }}
                    alt="템3"
                    src={`https://opgg-static.akamaized.net/images/pattern/opacity.1.png`}
                  ></img>
                )}
              </span>
              <span style={styles.item}>
                {item4 ? (
                  <img
                    alt="템4"
                    src={`https://opgg-static.akamaized.net/images/lol/item/${item4}.png?image=q_auto,w_22&v=1603864069`}
                  ></img>
                ) : (
                  <img
                    style={{ width: "22px", height: "22px" }}
                    alt="템4"
                    src={`https://opgg-static.akamaized.net/images/pattern/opacity.1.png`}
                  ></img>
                )}
              </span>
              <span style={styles.item}>
                {item5 ? (
                  <img
                    alt="템5"
                    src={`https://opgg-static.akamaized.net/images/lol/item/${item5}.png?image=q_auto,w_22&v=1603864069`}
                  ></img>
                ) : (
                  <img
                    style={{ width: "22px", height: "22px" }}
                    alt="템5"
                    src={`https://opgg-static.akamaized.net/images/pattern/opacity.1.png`}
                  ></img>
                )}
              </span>
            </div>
            {visionWardsBoughtInGame ? (
              <div style={styles.trinKet}>
                <img
                  style={{ width: "16px", height: "16px", marginRight: "4px" }}
                  alt="와드"
                  src={`https://opgg-static.akamaized.net/images/site/summoner/icon-ward-${wardColor}.png`}
                ></img>

                {`제어와드 ${visionWardsBoughtInGame}`}
              </div>
            ) : (
              ""
            )}
          </div>
          <div style={styles.team100}>
            <div style={styles.player}>
              <div>
                <img
                  alt="챔프사진"
                  style={styles.pChampImage}
                  src={`https://opgg-static.akamaized.net/images/lol/champion/${
                    teamProfile[i * 10].enChampName
                  }.png?image=q_auto,w_46&v=1603864069`}
                ></img>
              </div>
              <div style={styles.name}>{teamProfile[i * 10].summonerName}</div>
            </div>

            <div style={styles.player}>
              <div>
                <img
                  alt="챔프사진"
                  style={styles.pChampImage}
                  src={`https://opgg-static.akamaized.net/images/lol/champion/${
                    teamProfile[i * 10 + 1].enChampName
                  }.png?image=q_auto,w_46&v=1603864069`}
                ></img>
              </div>
              <div style={styles.name}>
                {teamProfile[i * 10 + 1].summonerName}
              </div>
            </div>

            <div style={styles.player}>
              <div>
                <img
                  alt="챔프사진"
                  style={styles.pChampImage}
                  src={`https://opgg-static.akamaized.net/images/lol/champion/${
                    teamProfile[i * 10 + 2].enChampName
                  }.png?image=q_auto,w_46&v=1603864069`}
                ></img>
              </div>
              <div style={styles.name}>
                {teamProfile[i * 10 + 2].summonerName}
              </div>
            </div>

            <div style={styles.player}>
              <div>
                <img
                  alt="챔프사진"
                  style={styles.pChampImage}
                  src={`https://opgg-static.akamaized.net/images/lol/champion/${
                    teamProfile[i * 10 + 3].enChampName
                  }.png?image=q_auto,w_46&v=1603864069`}
                ></img>
              </div>
              <div style={styles.name}>
                {teamProfile[i * 10 + 3].summonerName}
              </div>
            </div>

            <div style={styles.player}>
              <div>
                <img
                  alt="챔프사진"
                  style={styles.pChampImage}
                  src={`https://opgg-static.akamaized.net/images/lol/champion/${
                    teamProfile[i * 10 + 4].enChampName
                  }.png?image=q_auto,w_46&v=1603864069`}
                ></img>
              </div>
              <div style={styles.name}>
                {teamProfile[i * 10 + 4].summonerName}
              </div>
            </div>
          </div>
          <div style={styles.team200}>
            <div style={styles.player}>
              <div>
                <img
                  alt="챔프사진"
                  style={styles.pChampImage}
                  src={`https://opgg-static.akamaized.net/images/lol/champion/${
                    teamProfile[i * 10 + 5].enChampName
                  }.png?image=q_auto,w_46&v=1603864069`}
                ></img>
              </div>
              <div style={styles.name}>
                {teamProfile[i * 10 + 5].summonerName}
              </div>
            </div>

            <div style={styles.player}>
              <div>
                <img
                  alt="챔프사진"
                  style={styles.pChampImage}
                  src={`https://opgg-static.akamaized.net/images/lol/champion/${
                    teamProfile[i * 10 + 6].enChampName
                  }.png?image=q_auto,w_46&v=1603864069`}
                ></img>
              </div>
              <div style={styles.name}>
                {teamProfile[i * 10 + 6].summonerName}
              </div>
            </div>

            <div style={styles.player}>
              <div>
                <img
                  alt="챔프사진"
                  style={styles.pChampImage}
                  src={`https://opgg-static.akamaized.net/images/lol/champion/${
                    teamProfile[i * 10 + 7].enChampName
                  }.png?image=q_auto,w_46&v=1603864069`}
                ></img>
              </div>
              <div style={styles.name}>
                {teamProfile[i * 10 + 7].summonerName}
              </div>
            </div>

            <div style={styles.player}>
              <div>
                <img
                  alt="챔프사진"
                  style={styles.pChampImage}
                  src={`https://opgg-static.akamaized.net/images/lol/champion/${
                    teamProfile[i * 10 + 8].enChampName
                  }.png?image=q_auto,w_46&v=1603864069`}
                ></img>
              </div>
              <div style={styles.name}>
                {teamProfile[i * 10 + 8].summonerName}
              </div>
            </div>

            <div style={styles.player}>
              <div>
                <img
                  alt="챔프사진"
                  style={styles.pChampImage}
                  src={`https://opgg-static.akamaized.net/images/lol/champion/${
                    teamProfile[i * 10 + 9].enChampName
                  }.png?image=q_auto,w_46&v=1603864069`}
                ></img>
              </div>
              <div style={styles.name}>
                {teamProfile[i * 10 + 9].summonerName}
              </div>
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
  return showStats(
    match20GameInfoRes,
    summonerName,
    champList,
    spellList,
    styles
  );
};

export default GameAndItemList;

const styles = {
  gameStats: {
    width: "72px",
    display: "block",
    textAlign: "center",
    fontSize: "12px",
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
    marginLeft: "4px",
  },
  spell1: {
    width: "22px",
    height: "22px",
    marginBottom: "4px",
  },
  KDARatio: {
    color: "#555e5e",
    fontSize: "12px",
    fontWeight: "bold",
    marginTop: "6px",
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
    marginLeft: "4px",
  },
  rune1: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    background: "#000",
    marginBottom: "4px",
  },
  rune2: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
  },
  champName: {
    marginTop: "8px",
    fontSize: "12px",
    color: "#555",
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  KDABox: {
    display: "block",
    width: "114px",
    fontSize: "15px",
    textAlign: "center",
  },
  stats: {
    display: "block",
    width: "90px",
    fontSize: "11px",
    textAlign: "center",
    lineHeight: "18px",
    color: "#555e5e",
  },
  trinKet: {
    marginTop: "7px",
    color: "#353a3a",
    lineHeight: "13px",
    fontSize: "11px",
    textAlign: "center",
  },
  items: {
    display: "block",
    width: "150px",
  },
  item: {
    width: "22px",
    height: "22px",
    border: "0",
    margin: "4px 0 0 4px",
  },
  team100: {
    display: "block",
    width: "170px",
  },
  team200: {
    display: "block",
    width: "170px",
  },
  player: {
    display: "flex",
    width: "80px",
    height: "18px",
    marginLeft: "3px",
    textAlign: "left",
    whiteSpace: "nowrap",
    justifyContent: "center",
    alignItems: "center",
  },
  pChampImage: {
    width: "16px",
    height: "16px",
    marginLeft: "4px",
    borderRadius: "50%",
  },
  name: {
    display: "block",
    color: "inherit",
    textDecoration: "none",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontSize: "11px",
    width: "70px",
  },
};
