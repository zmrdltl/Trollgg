import React from "react";

const ProgressBar = (props) => {
  const { completed, opacity } = props;

  const container = {
    backgroundColor: "#f4f4f4",
    fontFamily: "Montserrat",
    borderRadius: "22px",
    display: "flex",
    margin: 0,
  };

  const progressData = {
    background: "linear-gradient(to left, #f2709c, #ff9472)",
    boxShadow: "0 3pc 3pc -5pc #f2709c, 0 2pc 5pc #f2709c",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: `${completed}%`,
    opacity: `${opacity}`,
    transition: "ls ease 0.3s",
  };

  return (
    <div style={container}>
      <div style={progressData}>{`${completed}%`}</div>
    </div>
  );
};

export default ProgressBar;
