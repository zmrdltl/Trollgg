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
  const trollPercent = 50;
  const profileIcon = JSON.parse(Test.summonerRes).profileIcon;
  const [isLoaded, setIsLoaded] = useState(1);
  const [summonerRes, setSummonerRes] = useState({});
  const [leagueRes, setLeagueRes] = useState({});
  const [id, setId] = useState("");
  const [matchList, setMatchList] = useState({});
  const [tier, setTier] = useState("");
  //const champList = API.getChampList();
  //const summonerRes = JSON.parse(Test.summonerRes);

  //const leagueRes = JSON.parse(Test.leagueRes);

  useEffect(() => {
    mineData();
  }, [isLoaded]);
  console.log("summonerRes", summonerRes);
  console.log("암호화된 summonerId", id);
  console.log("leagueRes", leagueRes);
  //console.log("이 소환사의 모든 match", matchList);

  const mineData = async () => {
    console.log("data 쫘아악 얻어오기 실행됨");
    const summonerRes = await API.getRiotSummoner(summonerName);
    let leagueRes = await API.getRiotLeague(summonerRes.id);
    leagueRes = leagueRes[0];
    // const matchList = await axios.get(
    //   `https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/-Yug45lMcljdMo4knm_9Pp28YpbK6t9DR-NKLbGVhYeO?api_key=RGAPI-c5c7eaa5-0cd3-401d-a9e0-8f3b564d4a9a`
    // );
    //setMatchList(matchList);
    setTier(leagueRes.tier);
    setSummonerRes(summonerRes);
    setId(summonerRes.id);
    setLeagueRes(leagueRes);
  };

  return (
    <div style={styles.container}>
      {Test.summonerRes.length === 0 || summonerName.length === 0 ? (
        <h1>등록된 유저가 없습니다. </h1>
      ) : (
        <div>
          <TopHeaderBox
            summonerRes={summonerRes}
            leagueRes={leagueRes}
            trollPercent={trollPercent}
            tier={tier}
            // leagueRes={leagueRes}
          />

          <div style={styles.content}>
            <SideContents
              summonerRes={summonerRes}
              leagueRes={leagueRes}
              tier={tier}
            />
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
