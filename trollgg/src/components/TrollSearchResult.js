import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import queryString from "query-string";
import ProgressBar from "../container/ProgressBar";
import Match from "./summoner_profile/match.js";
//행패성 leagueId: "54fb7852-29f5-44ac-8454-7a45a0b787d3"
//queueType: "RANKED_SOLO_5x5"
//rank: "로마숫자"
//encryptedSummornerId-> summonerId: "EuBfqKp2DfCRLTUqZlyD3oq25KWG5TJEAh0osQE6QtrVRA"
const TrollSearchResult = ({ location, match }) => {
  const query = queryString.parse(location.search);
  const [isSubmitted, setIssumbitted] = useState(false);
  const [league, setLeagueData] = useState("");
  const [matchList, setMatchList] = useState([]);
  const summonerName = query.name;
  const dataDone = 0;
  const urlHeader = "52.78.119.98:4000/api";
  const [completed, setCompleted] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const trollPercent = 90;

  //위험도 그래프 그리기
  useEffect(() => {
    if (completed < trollPercent) {
      setTimeout(() => {
        setOpacity(1);
        setCompleted(completed + 1);
      }, 5);
    }
  }, [completed]);

  const handleSubmit = async (e) => {
    e.preventDefault(); //기존 페이지 flush 안하는 코드
    console.log("submit!");
    setMatchList([]);
    //league res
    const leagueRes = await axios.get(
      urlHeader + "/user/league?TrollSearchResult=" + summonerName
    );
    console.log("난 됨");
    // console.log(leagueRes);
    const matchRes = await axios.get(
      urlHeader + "/user/matchlist?TrollSearchResult=" + summonerName
    );

    let accountId = await axios.get(
      urlHeader + "/user/accountId?TrollSearchResult=" + summonerName
    );

    let summoner = await axios.get(
      urlHeader + "/user/summoner?TrollSearchResult=" + summonerName
    );
    console.log(matchRes);

    const leagueData = JSON.parse(leagueRes.data);
    let latestTenMatch = JSON.parse(matchRes.data);
    //한게임에
    for (const i = 0; i < 10; i++) {
      const matchinfo = new Array();

      //10명의 참여자
      const matchRes = await axios.get(
        urlHeader +
          "/match/matches/participantIdentities?gameId=" +
          latestTenMatch[i].gameId
      );

      const res = await axios.get(
        urlHeader +
          "/match/matches/participants?gameId=" +
          latestTenMatch[i].gameId
      );

      const participants = JSON.parse(res.data);
      matchRes = matchRes.data;
      const matchDataJson = JSON.parse(matchRes);

      for (const j = 0; j < 10; j++) {
        let championId = participants[j].championId;
        let participantId = participants[j].participantId;
        let spell1Id = participants[j].spell1Id;
        let spell2Id = participants[j].spell2Id;
        matchinfo.push({
          championId,
          participantId,
          spell1Id,
          spell2Id,
        });
      }
      setMatchList((matchList) => [...matchList, matchinfo]);
    }

    console.log(matchList);
    setLeagueData(leagueData);
    //개인정보 저장
    setIssumbitted(true);
  };
  return (
    <div style={container}>
      <div>
        {summonerName}
        <h2>Troll 위험도</h2>
        <ProgressBar bgcolor={"#6a1b9a"} completed={completed} opacity={1} />
      </div>
    </div>
  );
};

export default TrollSearchResult;

const font = {
  alignItems: "center",
  justifyContent: "center",
};

const container = {
  display: "flex",
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Montserrat",
};

const profile = {
  position: "relative",
  width: "100%",
  margin: "0 auto",
  padding: "20px 0 0 0",
};
