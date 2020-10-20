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
  const [summonerName, setSummonerName] = useState("");

  console.log(props);

  const moveToSummonerPage = (summonerName) => {
    document.location.href = `/TrollSearchResult?name=${summonerName}`;
  };

  const handleKeyPress = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      moveToSummonerPage(e.target.value);
    }
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
          placeholder="소환사 이름"
          value={summonerName}
          onChange={(e) => setSummonerName(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
          name="name"
        />
        <Button
          variant="outline-info"
          onClick={() => moveToSummonerPage(summonerName)}
        >
          검색
        </Button>
      </Form>
    </Navbar>
  );
};

export default Navigation;
