import React from "react";
const Box1 = (props) => {
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
