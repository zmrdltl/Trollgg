import React from "react";

const TierRaingBox = (props) => {
  return (
    <div style={styles.container}>
      {" "}
      <div style={styles.box}>난 티어랑 승률</div>{" "}
    </div>
  );
};

export default TierRaingBox;
const styles = {
  container: {
    padding: "0 0 10px 0",
  },
  box: {
    display: "table",
    width: "300px",
    height: "142px",
    position: "relative",
    solid: "1px #cdd2d2",
    border: "1px solid #cdd2d2",
    boxShadow: "0 1px #dcdfdf",
    background: "#f2f2f2",
    color: "#879292",
    borderRadius: "2px",
  },
};
