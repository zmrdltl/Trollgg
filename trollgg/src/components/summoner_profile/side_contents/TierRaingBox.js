import React, { useState } from "react";
import * as Test from "../../test";
import axios from "axios";
import { RIOT_API_KEY, RIOT_HEADER } from "../../../util/Auth";
import * as API from "../../../api/API";
const TierRaingBox = (props) => {
  //const [a, setA] = useState("");
  const { leagueRes, tier, leagueName } = props;
  const leagueId = leagueRes.leagueId;
  const rank = leagueRes.rank;
  const leaguePoints = leagueRes.leaguePoints;
  const wins = leagueRes.wins;
  const losses = leagueRes.losses;

  // const leagueIdInfo = Test.leagueIdInfo;
  // const leagueName = leagueIdInfo.name;
  // console.log(leagueIdInfo.name);
  const convertRankToNum = (rank) => {
    if ((rank = `I`)) return 1;
    if ((rank = `II`)) return 2;
    if ((rank = `III`)) return 3;
    if ((rank = `IV`)) return 4;
  };
  //`https://kr.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${RIOT_API_KEY}`
  //`https://kr.api.riotgames.com/lol/league/v4/leagues/${leagueId}`
  // const setLeagueInfo = async () => {
  //   setA(
  //     await axios.get(
  //       RIOT_HEADER +
  //         `lol/league/v4/leagues/${leagueId}?api_key=${RIOT_API_KEY}`
  //     )
  //   );
  //   return 1;
  // };
  // setLeagueInfo();
  // console.log(a);
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.medal}>
          <img
            src={`https://opgg-static.akamaized.net/images/medals/${tier.toLowerCase()}_${convertRankToNum(
              rank
            )}.png?image=q_auto&v=1`}
            width="104px"
            height="104px"
            style={{ margin: "-5px 0 -10px" }}
            alt="티어사진"
          ></img>
        </div>

        <div style={styles.tierRankInfo}>
          <div style={styles.rankType}>솔로랭크</div>
          <div style={styles.tierRank}>{`${tier} ${rank}`}</div>
          <div>
            <span
              style={{ fontWeight: "bold", color: "#555E5e" }}
            >{`${leaguePoints}LP `}</span>
            <span>{`/ ${wins}승 `}</span>
            <span>{`${losses}패`}</span>
          </div>
          <div>{`솔랭승률 ${parseInt(
            Math.round((wins / (wins + losses)) * 100)
          )}%`}</div>
          <div>{leagueName}</div>
        </div>
      </div>
    </div>
  );
};

export default TierRaingBox;
const styles = {
  container: {
    padding: "0 0 10px 0",
  },
  box: {
    display: "table",
    width: "300px",
    height: "142px",
    position: "relative",
    solid: "1px #cdd2d2",
    border: "1px solid #cdd2d2",
    boxShadow: "0 1px #dcdfdf",
    background: "#f2f2f2",
    color: "#879292",
    borderRadius: "2px",
  },
  medal: {
    display: `table-cell`,
    verticalAlign: "middle",
    width: `120px`,
    height: `124px`,
    textAlign: `center`,
  },
  rankType: {
    fontSize: "11px",
    color: "#879292",
  },
  tierRankInfo: {
    display: "table-cell",
    verticalAlign: "middle",
    fontSize: "12px",
    lineHeight: "1.5",
    textAlign: "left",
  },
  tierRank: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#1f8ecd",
  },
};
