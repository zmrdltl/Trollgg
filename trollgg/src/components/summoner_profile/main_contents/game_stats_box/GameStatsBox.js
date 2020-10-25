import React from "react";
import Box1 from "./Box1";
import Box2 from "./Box2";
import Box3 from "./Box3";
const GameStatsBox = (props) => {
  const { match20GameInfoRes, summonerRes } = props;
  return (
    <div style={styles.container}>
      <Box1 match20GameInfoRes={match20GameInfoRes} summonerRes={summonerRes} />
      <Box2 />
      <Box3 />
    </div>
  );
};

export default GameStatsBox;

const styles = {
  container: {
    display: "flex",
    alignItems: "center", //세로 중앙 정렬
    border: "1px solid #cdd2d2",
    boxShadow: "0 1px #dcdfdf",
    background: "#f2f2f2",
    borderRadius: "2px",
    width: "690px",
    height: "153px",
  },
  font: {
    padding: "10px",
    fontSize: "15px",
    color: "#1f82cd",
  },
};
