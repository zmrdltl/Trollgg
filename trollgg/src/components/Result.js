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

const get20ResGameInfoRes = async (matchListRes) => {
  const match20GameInfo = [];

  for (let i = 0; i < matchListRes.matches.length; i++) {
    match20GameInfo[i] = await API.getRiotMatch(matchListRes.matches[i].gameId);
  }
  return match20GameInfo;
};

const Result = ({ location, match }) => {
  const query = queryString.parse(location.search);
  const summonerName = query.name;
  const trollPercent = 50;
  const [isLoaded, setIsLoaded] = useState(1);
  const [summonerRes, setSummonerRes] = useState({});
  const [leagueRes, setLeagueRes] = useState({});
  const [leaguesRes, setLeaguesRes] = useState({});
  const [leagueName, setLeagueName] = useState("");
  const [id, setId] = useState("");
  const [tier, setTier] = useState("");
  const [match20GameInfoRes, setMatch20GameInfoRes] = useState([]);
  const [matchListRes, setMatchListRes] = useState({});
  //TEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // const summonerRes = Test.summonerRes;
  // const leagueRes = Test.leagueRes;
  // const id = Test.summonerRes.id;
  //const matchListRes = Test.matchListRes;
  //const match20GameInfoRes = Test.match20GameInfoRes;
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const mineData = async () => {
    console.log("data 쫘아악 얻어오기 실행됨");
    const summonerRes = await API.getRiotSummoner(summonerName);
    const matchListRes = await API.getRiotMatchList({
      accountId: summonerRes.accountId,
      queue: 420,
      season: 13,
      beginIndex: 0,
      endIndex: 20,
    });
    let leagueRes = await API.getRiotLeague(summonerRes.id);
    leagueRes = leagueRes[0];
    let leaguesRes = await API.getRiotLeagues(leagueRes.leagueId);
    const match20GameInfoRes = await get20ResGameInfoRes(matchListRes);
    setTier(leagueRes.tier);
    setSummonerRes(summonerRes);
    setId(summonerRes.id);
    setLeagueRes(leagueRes);
    setLeaguesRes(leaguesRes);
    setMatchListRes(matchListRes);
    setMatch20GameInfoRes(match20GameInfoRes);
  };
  useEffect(() => {
    mineData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  // console.log("summonerRes", summonerRes);
  // console.log("암호화된 summonerId", id);
  // console.log("leagueRes", leagueRes);
  //console.log("솔로랭크 최근 최대 20경기 목록", matchListRes);
  // console.log("소환사 속한 리그정보", leaguesRes);
  // console.log("소환사 속한 리그이름", leaguesRes.name);
  //console.log("이 소환사의 모든 match", matchList);
  //console.log("한 게임당 자세한 정보", match20GameInfoRes);
  return (
    <div style={styles.container}>
      {summonerRes.length === 0 || summonerName.length === 0 ? (
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
              leagueName={leaguesRes.name}
            />
            <MainContents
              summonerRes={summonerRes}
              leagueRes={leagueRes}
              match20GameInfoRes={match20GameInfoRes}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;

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
  },
};
