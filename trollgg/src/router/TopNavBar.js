import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import styled from "styled-components";
import { leagueRes, matchRes, accountId, summonerName } from "../util/User";
import { URL_HEADER, RIOT_HEADER } from "../util/Auth";
const Navigation = (props) => {
  const [isSubmitted, setIssumbitted] = useState(false);
  const [league, setLeagueData] = useState("");
  const [matchList, setMatchList] = useState([]);
  const [name, setName] = useState("");

  console.log(props);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //기존 페이지 flush 안하는 코드
    setMatchList([]);
    //league res
    const leagueRes = await leagueRes(name);
    console.log(leagueRes);
    var matchRes = await axios.get(
      RIOT_HEADER + "/user/matchlist?summonerName=" + name
    );
    let accountId = await axios.get(
      RIOT_HEADER + "/user/accountId?summonerName=" + name
    );
    let summoner = await axios.get(
      RIOT_HEADER + "/user/summoner?summonerName=" + name
    );

    var leagueData = JSON.parse(leagueRes.data);
    let latestTenMatch = JSON.parse(matchRes.data);
    //한게임에
    for (var i = 0; i < 10; i++) {
      var matchinfo = new Array();

      //10명의 참여자
      var matchRes = await axios.get(
        RIOT_HEADER +
          "/match/matches/participantIdentities?gameId=" +
          latestTenMatch[i].gameId
      );

      var res = await axios.get(
        RIOT_HEADER +
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
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Trollgg</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/Statistics">통계</Nav.Link>
        <Nav.Link href="/Rank">랭크</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl
          type="text"
          placeholder="소환사 이름"
          className="mr-sm-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          name="name"
        />
        <Button
          variant="outline-info"
          onChange={(e) => setName(e.target.value)}
          onClick={handleKeyPress}
        >
          Search
        </Button>
      </Form>
    </Navbar>
  );
};

export default Navigation;
