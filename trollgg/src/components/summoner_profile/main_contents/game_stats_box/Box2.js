import React from "react";
const Box2 = (props) => {
  return <div style={styles.container}>난 박스 2</div>;
};

export default Box2;

const styles = {
  container: {
    display: "inline-block",
    width: "230px",
    fontSize: "15px",
    verticalAlign: "top",
  },
};
