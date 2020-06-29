import React, { useState, Fragment } from "react";
import ResDataTable from "./components/resDataTable";
import styled from "styled-components";
import Navigation from "./router/nav";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoMatch from "./components/NoMatch";
import SummonerName from "./components/SummonerName";
const App = (props) => {
  const [path, setPath] = useState("/");
  return (
    <Container>
      <Navigation />
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/NoMatch" component={NoMatch}></Route>
          <Route path="/SummonerName" component={SummonerName}></Route>
          <Route path="/About" component={About}></Route>
        </Switch>
      </Router>
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
  background-color: #464964;
  background-size: cover;
`;

export default App;
