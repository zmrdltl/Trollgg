import React, { useState, Fragment } from "react";
import styled from "styled-components";
import Navigation from "./router/TopNavBar";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Rank from "./components/Rank";
import Statistics from "./components/Statistics";
import TrollSearchResult from "./components/TrollSearchResult";

const App = (props) => {
  return (
    <Container>
      <Navigation />

      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/Statistics" component={Statistics}></Route>
          <Route path="/Rank" component={Rank}></Route>
        </Switch>
      </Router>

      <Switch>
        <Route path="/TrollSearchResult" component={TrollSearchResult} />
        <Route path="/TrollSearchResult/:name" component={TrollSearchResult} />
      </Switch>
    </Container>
  );
};

//속성을 주는 법 styled.(속성)
const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  background-size: cover;
`;

export default App;
