import React from "react";
import TierRatingBox from "./TierRaingBox";
import MostPickInfoBox from "./MostPickInfoBox";
const SideContents = (props) => {
  return (
    <div style={styles.container}>
      <TierRatingBox />
      <MostPickInfoBox />
    </div>
  );
};

export default SideContents;

const styles = {
  container: {
    display: "inline-block",
    width: "300px",
    fontSize: "15px",
    verticalAlign: "top",
    marginRight: "12px",
  },
};
