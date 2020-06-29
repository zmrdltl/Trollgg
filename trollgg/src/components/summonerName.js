import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const SummonerName = (props) => {
  //행패성 leagueId: "54fb7852-29f5-44ac-8454-7a45a0b787d3"
  //queueType: "RANKED_SOLO_5x5"
  //rank: "로마숫자"
  //encryptedSummornerId-> summonerId: "EuBfqKp2DfCRLTUqZlyD3oq25KWG5TJEAh0osQE6QtrVRA"
  console.log("SummonerName 눌렸다!!!");
  const { leagueData, matchList } = props;
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
  //   summonerName,
  //   tier,
  //   veteran,
  //   wins,
  // } = leagueData;

  console.log("매치리스트 :", matchList);
  console.log("리그데이터 :", leagueData);
  return (
    <Container>
      <MidTable>
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
      </li>
    </Container>
    // <Container>
    //   <div>Go to Details</div>
    // </Container>
  );
};

export default SummonerName;

const Container = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #464964;
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
