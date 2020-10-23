import React, { useState, useEffect } from "react";

const ProgressBar = (props) => {
  const { trollPercent, opacity } = props;
  const [completed, setCompleted] = useState(0);

  //위험도 그래프 그리기
  useEffect(() => {
    if (completed < trollPercent) {
      setTimeout(() => {
        setCompleted(completed + 1);
      }, 5);
    }
  }, [completed, trollPercent]);

  const styles = {
    container: {
      backgroundColor: "#f4f4f4",
      fontFamily: "Montserrat",
      borderRadius: "22px",
      display: "flex",
      margin: 0,
    },

    progressData: {
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
      color: "#ffffff",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.progressData}>{`${completed}%`}</div>
    </div>
  );
};

export default ProgressBar;
