import React from "react";
import TierRatingBox from "./TierRaingBox";
import MostPickInfoBox from "./MostPickInfoBox";
const SideContents = (props) => {
  const { leagueRes, summonerRes, tier } = props;
  return (
    <div style={styles.container}>
      <TierRatingBox
        leagueRes={leagueRes}
        summonerRes={summonerRes}
        tier={tier}
      />
      <MostPickInfoBox leagueRes={leagueRes} summonerRes={summonerRes} />
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
