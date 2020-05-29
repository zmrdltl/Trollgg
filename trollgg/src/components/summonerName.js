import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
const summonerName = (props) => {
  const [name, setName] = useState("");
  const [isSubmitted, setIssumbitted] = useState(false);
  const [league, setLeague] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var res = await axios.get(
      "http://ec2-54-180-82-172.ap-northeast-2.compute.amazonaws.com:4000/api/user/league?summonerName=" +
        name
    );
    console.log(res);
    var resJSON = JSON.parse(res.data);
    console.log(resJSON);
    setLeague(resJSON.summonerName + resJSON.tier + resJSON.rank);
    setIssumbitted(true);
  };

  return (
    <Container>
      <div href="../public/index.html">Go to Details</div>
    </Container>
  );
};

export default summonerName;

const Container = styled.h1`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(https://source.unsplash.com/random/1920x1080);
  background-size: cover;
`;
