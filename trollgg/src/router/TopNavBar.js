import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Navigation = (props) => {
  const [summonerName, setSummonerName] = useState("");
  const moveToSummonerPage = (summonerName) => {
    document.location.href = `/Result?name=${summonerName}`;
  };

  const handleKeyPress = (e) => {
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
