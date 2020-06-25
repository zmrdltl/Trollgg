import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Navigation from "../router/nav";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import SummonerName from "./SummonerName";
import ResDataTable from "./resDataTable";
import About from "./About";
import NoMatch from "./NoMatch";
const Home = (props) => {
  console.log("난 home이야 눌렸다!");
  const {} = props;
  const [name, setName] = useState("");
  const [isSubmitted, setIssumbitted] = useState(false);
  const [league, setLeagueData] = useState("");
  const [matchList, setMatchList] = useState([]);
  const [searchComplete, setSearchComplete] = useState(false);
  const [activePath, setActivePath] = useState("/");

  //database에 쌓아놓은 data에 쿼리를 날리기 위해 쓰이는 함수 get
  const urlHeader =
    "http://ec2-54-180-83-56.ap-northeast-2.compute.amazonaws.com:4000/api";

  //riot에 직접 get때리는 용 헤더
  const riotHeader =
    "http://ec2-54-180-82-172.ap-northeast-2.compute.amazonaws.com:4000/api";

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault(); //기존 페이지 flush 안하는 코드
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
    console.log(matchList);
    setLeagueData(leagueData);
    //개인정보 저장
    setIssumbitted(true);
  };

  return (
    <Container>
      <Navigation />

      <TopImage
        src="https://attach.s.op.gg/logo/20200610124936.f53f670b00d598130e25a1f1549a4a6f.png"
        title="이즈리얼과 카이사"
        alt="OP.GG Logo (이즈리얼과 카이사)"
      ></TopImage>

      <Title>TROLL.GG</Title>

      <TopDiv>
        <div>
          <Input
            placeholder="소환사 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            name="name"
          />
        </div>
        <div>
          <Button onClick={handleSubmit}>한 번만 제발</Button>
        </div>
      </TopDiv>

      {isSubmitted && (
        <Switch path="/SummonerName">
          {/* <ResDataTable leagueData={league} matchList={matchList} /> */}
          <SummonerName leagueData={league} matchList={matchList} />
        </Switch>
      )}
    </Container>
  );
};
export default Home;

//속성을 주는 법 styled.(속성)
const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #f0fff0;
  background-size: cover;
`;

const TopImage = styled.img`
  display: block;
  margin: 0px auto;
`;

const TopDiv = styled.span`
  flex-direction: row;
  justify-content: "space-evenly";
  padding: 10px;
`;

const Input = styled.input`
  display: block;
  margin: 0px auto;
  width: 624px;
  height: 50px;
  border: 3px solid green;
  padding: 10px;
  left: 50%;
`;

const Title = styled.h1`
  text-align: center;
  font-size : 35pt,
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
