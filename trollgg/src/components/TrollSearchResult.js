import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import SideContents from "./summoner_profile/side_contents/SideContents";
import MainContents from "./summoner_profile/main_contents/MainContents";
import TopHeaderBox from "./summoner_profile/header_contents/TopHeaderBox.js";
import * as API from "../api/API";
import * as Test from "./test";
//행패성 leagueId: "54fb7852-29f5-44ac-8454-7a45a0b787d3"
//queueType: "RANKED_SOLO_5x5"
//rank: "로마숫자"
//encryptedSummornerId-> summonerId: "EuBfqKp2DfCRLTUqZlyD3oq25KWG5TJEAh0osQE6QtrVRA"
const TrollSearchResult = ({ location, match }) => {
  const query = queryString.parse(location.search);
  const summonerName = query.name;
  const trollPercent = 70;
  const profileIcon = JSON.parse(Test.summonerRes).profileIcon;
  // const [matchList, setMatchList] = useState([]);
  // const [leagueRes, setLeagueRes] = useState("");
  const [isLoaded, setIsLoded] = useState(true);
  const summonerRes = JSON.parse(Test.summonerRes);
  const leagueRes = JSON.parse(Test.leagueRes);
  console.log(summonerRes);
  console.log(leagueRes);
  // useEffect(() => {
  //   mineData();
  // }, [isLoaded]);

  // const mineData = async () => {
  //   const summonerRes = JSON.parse(Test.summonerRes);
  //   const id = summonerRes.id;
  //   console.log("summonerRes", summonerRes);
  //   console.log("암호화된 summonerId", id);
  //   const leagueRes = await API.getRiotLeague(id);
  //   console.log(leagueRes);
  //   //   console.log("MINING DATA!");
  //   //   const matchRes = await API.getRiotMatchList(summonerName);
  //   //   console.log(matchRes);
  //   // const leagueRes = await API.getRiotLeague(summonerName);
  //   // console.log(leagueRes);
  //   // console.log(matchRes);
  //   // const leagueData = JSON.parse(leagueRes.data);
  //   // let latestTenMatch = JSON.parse(matchRes.data);
  //   // //한게임에
  //   // for (const i = 0; i < 10; i++) {
  //   //   const matchinfo = new Array();

  //   //   //10명의 참여자
  //   //   const matchRes = await axios.get(
  //   //     urlHeader +
  //   //       "/match/matches/participantIdentities?gameId=" +
  //   //       latestTenMatch[i].gameId
  //   //   );

  //   //   const res = await axios.get(
  //   //     urlHeader +
  //   //       "/match/matches/participants?gameId=" +
  //   //       latestTenMatch[i].gameId
  //   //   );

  //   //   const participants = JSON.parse(res.data);
  //   //   matchRes = matchRes.data;
  //   //   const matchDataJson = JSON.parse(matchRes);

  //   //   for (const j = 0; j < 10; j++) {
  //   //     let championId = participants[j].championId;
  //   //     let participantId = participants[j].participantId;
  //   //     let spell1Id = participants[j].spell1Id;
  //   //     let spell2Id = participants[j].spell2Id;
  //   //     matchinfo.push({
  //   //       championId,
  //   //       participantId,
  //   //       spell1Id,
  //   //       spell2Id,
  //   //     });
  //   //   }
  //   //   setMatchList((matchList) => [...matchList, matchinfo]);
  //   // }

  //   //setLeagueRes(leagueRes);
  // };

  return (
    <div style={styles.container}>
      {Test.summonerRes.length === 0 ? (
        <h1>등록된 유저가 없습니다. </h1>
      ) : (
        <div>
          <TopHeaderBox
            summonerName={summonerName}
            trollPercent={trollPercent}
            // leagueRes={leagueRes}
          />

          <div style={styles.content}>
            <SideContents />
            <MainContents />
          </div>
        </div>
      )}
    </div>
  );
};

export default TrollSearchResult;

const styles = {
  container: {
    display: "block",
    width: "100%",
    height: "100%",
    padding: "20px 20px 0 20px", //margin,padding: 상우하좌 순
    fontFamily: "Montserrat",
  },

  content: {
    display: "flex",
    width: "1000px",
    minHeight: "500px",
    margin: "0 auto",
    marginTop: "10px",
  },
};
