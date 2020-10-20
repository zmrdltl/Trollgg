import React, { useState } from "react";
import styled from "styled-components";
import About from "./Rank";
import NoMatch from "./Statistics";
import { Auth, URL_HEADER } from "../util/Auth";
const Home = (props) => {
  console.log("난 home이야");
  const [summonerName, setSummonerName] = useState("");

  const moveToSummonerPage = (summonerName) => {
    document.location.href = `/TrollSearchResult?name=${summonerName}`;
  };

  const handleKeyPress = (e) => {
    e.preventDefault();
    console.log("눌림");
    if (e.key === "Enter") {
      moveToSummonerPage(e.target.value);
    }
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
          value={summonerName}
          onChange={(e) => setSummonerName(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
          name="name"
        />

        <Button
          children={"검색"}
          color={"#464964"}
          background={"#e2e2e2"}
          onClick={() => moveToSummonerPage(summonerName)}
        ></Button>
      </TopSpan>
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

const Button = styled.button`
  display: block;
  margin: 0px auto;
  border: none;
  border-radius: 5px;
  font-size: 15pt;
`;
