import React from "react";
import * as Test from "../../../test";

const get20LatestMatches = (matchList) => {
  const match20 = [];
  for (let i = 0; i < 20; i++) {
    match20.push(matchList.matches[i]);
  }
  return match20;
};

const Box1 = (props) => {
  const match20 = get20LatestMatches(Test.matchList);
  console.log("최근 20경기!", match20);

  return <div style={styles.container}>난 박스 1</div>;
};

export default Box1;

const styles = {
  container: {
    display: "inline-block",
    width: "230px",
    fontSize: "15px",
    verticalAlign: "top",
  },
};
