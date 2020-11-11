import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as API from "../api/API";

const getRankText = (tierName) => {
  const name = tierName;
  if (name === "ChallengerI") return "챌린저";
  if (name === "GrandmasterI") return "그랜드마스터";
  if (name === "MasterI") return "마스터";

  if (name === "DiamondI") return "다이아I";
  if (name === "DiamondII") return "다이아II";
  if (name === "DiamondIII") return "다이아III";
  if (name === "DiamondIV") return "다이아IV";

  if (name === "PlatinumI") return "플레티넘I";
  if (name === "PlatinumII") return "플레티넘II";
  if (name === "PlatinumIII") return "플레티넘III";
  if (name === "PlatinumIV") return "플레티넘IV";

  if (name === "GoldI") return "골드I";
  if (name === "GoldII") return "골드II";
  if (name === "GoldIII") return "골드III";
  if (name === "GoldIV") return "골드IV";

  if (name === "SilverI") return "실버I";
  if (name === "SilverII") return "실버II";
  if (name === "SilverIII") return "실버III";
  if (name === "SilverIV") return "실버IV";

  if (name === "BronzeI") return "브론즈I";
  if (name === "BronzeII") return "브론즈II";
  if (name === "BronzeIII") return "브론즈III";
  if (name === "BronzeIV") return "브론즈IV";

  if (name === "IronI") return "아이언I";
  if (name === "IronII") return "아이언II";
  if (name === "IronIII") return "아이언III";
  if (name === "IronIV") return "아이언IV";
};

const getTIerName = (tierName) => {
  if (tierName === "ChallengerI") return "ChallengerI";
  if (tierName === "GrandmasterI") return "GrandmasterI";
  if (tierName === "MasterI") return "MasterI";

  if (tierName === "DiamondI") return "Diamond";
  if (tierName === "DiamondII") return "Diamond";
  if (tierName === "DiamondIII") return "Diamond";
  if (tierName === "DiamondIV") return "Diamond";

  if (tierName === "PlatinumI") return "Platinum";
  if (tierName === "PlatinumII") return "Platinum";
  if (tierName === "PlatinumIII") return "Platinum";
  if (tierName === "PlatinumIV") return "Platinum";

  if (tierName === "GoldI") return "Gold";
  if (tierName === "GoldII") return "Gold";
  if (tierName === "GoldIII") return "Gold";
  if (tierName === "GoldIV") return "Gold";

  if (tierName === "SilverI") return "Silver";
  if (tierName === "SilverII") return "Silver";
  if (tierName === "SilverIII") return "Silver";
  if (tierName === "SilverIV") return "Silver";

  if (tierName === "BronzeI") return "Bronze";
  if (tierName === "BronzeII") return "Bronze";
  if (tierName === "BronzeIII") return "Bronze";
  if (tierName === "BronzeIV") return "Bronze";

  if (tierName === "IronI") return "Iron";
  if (tierName === "IronII") return "Iron";
  if (tierName === "IronIII") return "Iron";
  if (tierName === "IronIV") return "Iron";
};
const showStatistic = (tiersInfo) => {
  const statisticList = [];
  const makeStatistic = () => {
    for (let i = 0; i < tiersInfo.length; i++) {
      const aggregationNum = tiersInfo[i].aggregation_num;
      const aggregationPer = tiersInfo[i].aggregation_per;
      const tierName = getTIerName(tiersInfo[i].tier_name);
      const usersNum = tiersInfo[i].users_num;
      const usersPer = tiersInfo[i].users_per;
      const rankText = getRankText(tiersInfo[i].tier_name);
      console.log(tierName);
      statisticList.push(
        <div key={i}>
          <table
            text-align="center"
            fontStyle="normal"
            fontWeight=" normal"
            line-height="1.5"
            text-color="#ffffff"
            height="100%"
            width="100%"
          >
            <tbody>
              {i === 0 ? (
                <tr>
                  <th>티어</th>
                  <th>랭크</th>
                  <th>랭크 상위%</th>
                  <th>랭크 누계%</th>
                  <th>유저 누계</th>
                </tr>
              ) : (
                ""
              )}

              <tr>
                <td rowSpan="1">
                  <img
                    src={require(`../assets/ranked_emblems/Emblem_${tierName}.png`)}
                    alt="챌린저"
                    title="챌린저"
                    height="137"
                    width="160"
                  ></img>
                </td>
                <td>{rankText}</td>
                <td>{`${usersPer}%`}</td>
                <td>{`${aggregationPer}%`}</td>
                <td>{`${aggregationNum}명`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    statisticList.sort((a, b) => {
      console.log(a, b);
      return a.aggregationNum - b.aggregationNum;
    });
    return statisticList;
  };
  return <div>{makeStatistic().map((item) => item)}</div>;
};
const Statistics = (props) => {
  const [tiersInfo, setTiersInfo] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const mineData = async () => {
    const tiersInfo = await API.getStatistics();
    setTiersInfo(tiersInfo);
  };
  useEffect(() => {
    mineData();
  }, []);
  console.log("난 Statistics이야!");
  console.log("tiersInfo", tiersInfo);
  return <div>{showStatistic(tiersInfo)}</div>;
};
export default Statistics;
