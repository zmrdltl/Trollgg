import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import queryString from "query-string";
const TrollSearchResult = ({ location, match }) => {
  const query = queryString.parse(location.search);
  const [isSubmitted, setIssumbitted] = useState(false);
  const [league, setLeagueData] = useState("");
  const [matchList, setMatchList] = useState([]);
  const summonerName = query.name;

  const urlHeader = "52.78.119.98:4000/api";

  console.log("이름", summonerName);
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

  //행패성 leagueId: "54fb7852-29f5-44ac-8454-7a45a0b787d3"
  //queueType: "RANKED_SOLO_5x5"
  //rank: "로마숫자"
  //encryptedSummornerId-> summonerId: "EuBfqKp2DfCRLTUqZlyD3oq25KWG5TJEAh0osQE6QtrVRA"
  // const {
  //   freshBlood,
  //   hotStreak,
  //   inactive,
  //   leagueId,
  //   leaguePoints,
  //   losses,
  //   queueType,
  //   rank,
  //   summonerId,
  //   TrollSearchResult,
  //   tier,
  //   veteran,
  //   wins,
  // } = leagueData;
  return (
    <Container>
      {/* <MidTable>
        <Medal>
          <span>
            <div>
              <img src="//opgg-static.akamaized.net/images/medals/bronze_2.png?image=q_auto&amp;v=1" />
            </div>
            <div>
              <h1>솔로랭크</h1>
            </div>
          </span>
        </Medal>
      </MidTable>
      <li>
        {matchList.map((match, i) => {
          return (
            <li key={`wrap_${i}`}>
              <li>MATCH : {i + 1}</li>
              {match.map((m, j) => {
                return (
                  <li key={`wrap_${j}`}>
                    {"championId: " +
                      m.championId +
                      "  participantId:  " +
                      m.participantId +
                      "  spell1Id:  " +
                      m.spell1Id +
                      "  spell2Id:  " +
                      m.spell2Id}
                  </li>
                );
              })}
            </li>
          );
        })}
      </li> */}
      <p>awefaewfawefawefawfawe</p>
      <h2>{summonerName}</h2>
    </Container>
    // <Container>
    //   <div>Go to Details</div>
    // </Container>
  );
};

export default TrollSearchResult;

const Container = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const MidTable = styled.span`
  width: 240px;
  height: 124px;
  display: table;
  color: #879292;
  position: relative;
  background-color: #ffffff;
  padding: 8px 0;
`;

const Medal = styled.span`
  display: table;
  width: 104px;
  height: 104px;
  color: #879292;
  position: relative;
  background-color: #f2f2f2;
`;
