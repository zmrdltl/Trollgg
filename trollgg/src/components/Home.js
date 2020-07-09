import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import SummonerName from "./SummonerName";
import ResDataTable from "./resDataTable";
import About from "./Rank";
import NoMatch from "./Statistics";
import Auth from "../util/Auth";
const Home = (props) => {
  console.log("난 home이야 눌렸다!");
  const [name, setName] = useState("");
  const [isSubmitted, setIssumbitted] = useState(false);
  const [league, setLeagueData] = useState("");
  const [matchList, setMatchList] = useState([]);

  //database에 쌓아놓은 data에 쿼리를 날리기 위해 쓰이는 함수 get
  const urlHeader =
    "http://ec2-13-124-174-195.ap-northeast-2.compute.amazonaws.com";

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
    let accountId = await axios.get(
      urlHeader + "/user/accountId?summonerName=" + name
    );
    let summoner = await axios.get(
      urlHeader + "/user/summoner?summonerName=" + name
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
      <TopImage
        src="https://attach.s.op.gg/logo/20200610124936.f53f670b00d598130e25a1f1549a4a6f.png"
        title="이즈리얼과 카이사"
        alt="OP.GG Logo (이즈리얼과 카이사)"
      ></TopImage>

      <Title>TROLL.GG</Title>

      <TopSpan>
        <Input
          placeholder="소환사 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          name="name"
        />

        <Button
          children={"검색"}
          color={"#464964"}
          background={"#e2e2e2"}
          onClick={handleSubmit}
        ></Button>
      </TopSpan>

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
  background-size: cover;
`;

const TopImage = styled.img`
  display: block;
  margin: 0px auto;
`;

const TopSpan = styled.span`
  display: block;
  margin: 0px auto;
  justify-content: space-evenly;
`;

const Input = styled.input`
  display: block;
  margin: 0px auto;
  width: 624px;
  height: 50px;
  border: 3px solid green;
`;

const Title = styled.h1`
  text-align: center;
  font-size : 1rem,
  text-color : '#ffffff',
  fontWeight : 'bold',
`;

function Button({ children, color, background }) {
  const StyledButton = styled.button`
    display: block;
    margin: 0px auto;
    border: none;
    border-radius: 5px;
    color: ${(props) => props.color || "#464964"};
    background: ${(props) => props.background || "#ffffff"};
    font-size: 15pt;
  `;
  return (
    <StyledButton color={color} background={background} Î>
      {children}
    </StyledButton>
  );
}
