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

const getSoloRankLeagueRes = (leagueRes) => {
  for (let i = 0; i < leagueRes.length; i++) {
    if (leagueRes[i].queueType === "RANKED_SOLO_5x5") {
      return leagueRes[i];
    }
  }
};

const Result = ({ location, match }) => {
  const query = queryString.parse(location.search);
  const summonerName = query.name;
  const [trollPercent, setTrollPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
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
    if (Object.keys(summonerRes).length) {
      const matchListRes = await API.getRiotMatchList({
        accountId: summonerRes.accountId,
        queue: 420,
        season: 13,
        beginIndex: 0,
        endIndex: 20,
      });
      let leagueRes = await API.getRiotLeague(summonerRes.id);
      leagueRes = getSoloRankLeagueRes(leagueRes);
      let leaguesRes = await API.getRiotLeagues(leagueRes.leagueId);
      const match20GameInfoRes = await get20ResGameInfoRes(matchListRes);
      const trollPercent = await API.getTrollScore(summonerName);
      console.log("트롤 퍼센트", trollPercent);
      setTier(leagueRes.tier);
      setSummonerRes(summonerRes);
      setId(summonerRes.id);
      setLeagueRes(leagueRes);
      setLeaguesRes(leaguesRes);
      setMatchListRes(matchListRes);
      setMatch20GameInfoRes(match20GameInfoRes);
      setTrollPercent(trollPercent);
    }
    setIsLoaded(true);
  };
  useEffect(() => {
    mineData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("summonerRes", summonerRes);
  // console.log("암호화된 summonerId", id);
  // console.log("leagueRes", leagueRes);
  //console.log("솔로랭크 최근 최대 20경기 목록", matchListRes);
  // console.log("소환사 속한 리그정보", leaguesRes);
  // console.log("소환사 속한 리그이름", leaguesRes.name);
  //console.log("이 소환사의 모든 match", matchList);
  //console.log("한 게임당 자세한 정보", match20GameInfoRes);
  console.log("트롤 점수", trollPercent);
  return (
    <div style={styles.container}>
      {isLoaded ? (
        Object.keys(summonerRes).length ? (
          <div>
            <TopHeaderBox
              summonerRes={summonerRes}
              leagueRes={leagueRes}
              trollPercent={trollPercent}
              tier={tier}
              isLoaded={isLoaded}
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
        ) : (
          <div>해당 소환사가 없습니다.</div>
        )
      ) : (
        <div style={styles.loading}>아</div>
      )}
    </div>
  );
};

export default Result;

const styles = {
  container: {
    display: "block",
    width: "100%",
    height: "3000px",
    padding: "20px 20px 0 20px", //margin,padding: 상우하좌 순
    fontFamily: "Montserrat",
    background: "#f2f2f2",
  },

  content: {
    display: "flex",
    width: "1000px",
    minHeight: "500px",
    margin: "0 auto",
  },

  loading: {
    display: "flex",
    width: "90px",
    height: "90px",
    justifyContent: "center",
    alignItems: "center",
  },
};
