import React from "react";

const HeaderBox = (props) => {
  return (
    <div style={styles.container}>
      <div style={styles.font}>
        <u>
          <b>솔로랭크</b>
        </u>
      </div>
    </div>
  );
};

export default HeaderBox;
const styles = {
  container: {
    display: "flex",
    alignItems: "center", //세로 중앙 정렬
    border: "1px solid #cdd2d2",
    boxShadow: "0 1px #dcdfdf",
    background: "#f2f2f2",
    borderRadius: "2px",
    width: "690px",
    height: "36px",
  },
  font: {
    padding: "10px",
    fontSize: "15px",
    color: "#1f82cd",
  },
};
