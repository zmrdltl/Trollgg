import React from "react";
import ProgressBar from "../../../container/ProgressBar";
const TopHeaderBox = (props) => {
  const { trollPercent, summonerRes, leagueRes, tier, isLoaded } = props;
  const summonerName = summonerRes.name;
  const summonerLevel = summonerRes.summonerLevel;
  const profileIconId = summonerRes.profileIconId;
  //  const tier = leagueRes.tier;

  const styles = {
    topView: {
      display: "flex",
      width: "1000px",
      margin: "0 auto",
    },

    name: {
      color: " #242929",
      fontSize: "20px",
      fontWeight: "bold",
      marginRight: "4px",
      verticalAlign: "middle",
    },
    profile: {
      position: "relative",
      height: "120px",
      width: "120px",
    },

    profileBorderImage: {
      backgroundImage: `url(https://opgg-static.akamaized.net/images/borders2/${tier.toLowerCase()}.png)`,
      position: "absolute",
      left: "-10px",
      top: "-10px",
      width: "120px",
      height: "120px",
      backgroundPosition: "center bottom",
      backgroundRepeat: "no-repeat",
    },
    profileImage: {
      display: "block",
      width: "100px",
      height: "100px",
      border: 0,
    },
    profileIconBelow: {
      position: "absolute",
      top: "100%",
      left: "50%",
      marginTop: "-28px",
      marginLeft: "-32px",
      width: "44px",
      height: "24px",
      paddingTop: "3px",
      boxSizing: "border-box",
      background: `url(https://opgg-static.akamaized.net/images/site/summoner/bg-levelbox.png)`,
      backgroundSize: "100%",
      lineHeight: "17px",
      fontSize: " 14px",
      textAlign: "center",
      color: "#eabd56",
    },
  };

  return (
    <div style={styles.topView}>
      <div style={styles.profile}>
        <div style={styles.profileBorderImage}></div>
        <img
          style={styles.profileImage}
          src={`https://opgg-static.akamaized.net/images/profile_icons/profileIcon${profileIconId}.jpg?image=q_auto&amp;v=1518361200`}
          alt={"프로필사진"}
        ></img>
        <div style={styles.profileIconBelow}>{summonerLevel}</div>
      </div>

      <div style={styles.progressBarContainer}>
        <div style={styles.name}>{summonerName}</div>
      </div>
    </div>
  );
};

export default TopHeaderBox;
