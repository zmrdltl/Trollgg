import React from "react";
const GameAndItemList = (props) => {
  return (
    <div style={styles.container}>내가 아이템이랑 게임 경기 가진 리스트야!</div>
  );
};

export default GameAndItemList;

const styles = {
  container: {
    display: "flex",
    alignItems: "center", //세로 중앙 정렬
    border: "1px solid #cdd2d2",
    boxShadow: "0 1px #dcdfdf",
    background: "#f2f2f2",
    borderRadius: "2px",
    width: "690px",
    marginTop: "10px",
  },
};
