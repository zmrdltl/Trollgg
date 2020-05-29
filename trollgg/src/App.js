import React, { useState } from "react";
import axios from "axios";
import ResDataTable from "./components/resDataTable";
import styled from "styled-components";

const App = (props) => {
  const [name, setName] = useState("");
  const [isSubmitted, setIssumbitted] = useState(false);
  const [league, setLeagueData] = useState("");
  const [matchList, setMatchList] = useState([]);

  const urlHeader =
    "http://ec2-54-180-82-172.ap-northeast-2.compute.amazonaws.com:4000/api";

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMatchList([]);
    //league res
    var leagueRes = await axios.get(
      urlHeader + "/user/league?summonerName=" + name
    );
    // console.log(leagueRes);
    var matchRes = await axios.get(
      urlHeader + "/user/matchlist?summonerName=" + name
    );

    // console.log(matchRes);

    var leagueData = JSON.parse(leagueRes.data);
    let latestTenMatch = JSON.parse(matchRes.data);
    var matchListJson = new Array();

    //한게임에
    for (var i = 0; i < 10; i++) {
      var matchinfo = new Array();

      //10명의 참여자
      var matchRes = await axios.get(
        urlHeader +
          "/match/matches/participantIdentities?gameId=" +
          latestTenMatch[i].gameId
      );

      var res = await axios.get(
        urlHeader +
          "/match/matches/participants?gameId=" +
          latestTenMatch[i].gameId
      );

      var participants = JSON.parse(res.data);
      matchRes = matchRes.data;
      var matchDataJson = JSON.parse(matchRes);

      for (var j = 0; j < 10; j++) {
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
    setLeagueData(leagueData);
    //개인정보 저장
    setIssumbitted(true);
  };

  return (
    <Container>
      <Title>Trollgg</Title>
      <a>
        <Input
          placeholder="소환사 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          name="name"
        />
        <Button type="button">한 번만 제발</Button>
        <Button type="button">한 번만 제발</Button>
      </a>
      {isSubmitted && (
        <div>
          Go to Details
          <ResDataTable leagueData={league} matchList={matchList} />
        </div>
      )}
    </Container>
  );
};

//속성을 주는 법 styled.(속성)
const Container = styled.div`
  display: flex
  flex-direction: column
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  //background: url(https://source.unsplash.com/random/1920x1080);
  background-size: cover;
`;

const a = styled.div`
  justify-content: "space-evenly";
  padding: 10px;
  flex-direction: row;
`;
const Input = styled.input`
  align-content: center;
  width: 50%;
  height: 20%;
  border: 3px solid green;
  padding: 10px;
  left: 50%;
`;

const Title = styled.h1`
  text-align: center;
  font-size : 32,
  color : '#111111',
  fontWeight : 'bold',
`;

const Button = styled.button`
  padding: 10px 15px;
  margin: 0 5px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => {
    if (props.success) return "#249D3D";
    else if (props.danger) return "#D72E3D";
    else return "#7B838B";
  }};
  color: #ffffff;
  font-size: 15pt;
`;

export default App;
