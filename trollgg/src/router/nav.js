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
// import styled from "styled-components";
// import summonerName from "../components/SummonerName";
// import Home from "../components/Home";
// import App from "../App";

const Navigation = (props) => {
  console.log(props);
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Trollgg</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/NoMatch">NoMatch</Nav.Link>
        <Nav.Link href="/SummonerName">summonerName</Nav.Link>
        <Nav.Link href="/About">About</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
    </Navbar>
  );
};

export default Navigation;
