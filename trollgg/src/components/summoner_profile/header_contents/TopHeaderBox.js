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
    },

    name: {
      display: "flex",
      color: " #242929",
      fontSize: "40px",
      fontWeight: "bold",
      marginRight: "4px",
      alignItems: "center",
      justifyContent: "center",
      height: "170px",
    },
    profile: {
      position: "relative",
      height: "170px",
      width: "170px",
    },

    profileBorderImage: {
      position: "absolute",
      left: "-10px",
      top: "-10px",
      width: "175px",
      height: "175px",
      backgroundPosition: "center bottom",
      backgroundRepeat: "no-repeat",
    },
    profileImage: {
      display: "block",
      width: "150px",
      height: "150px",
      border: 0,
    },
    profileIconBelow: {
      position: "absolute",
      top: "100%",
      left: "50%",
      marginTop: "-35px",
      marginLeft: "-40px",
      width: "66px",
      height: "36px",
      paddingTop: "10px",
      boxSizing: "border-box",
      background: `url(https://opgg-static.akamaized.net/images/site/summoner/bg-levelbox.png)`,
      backgroundSize: "100%",
      lineHeight: "17px",
      fontSize: " 14px",
      textAlign: "center",
      color: "#eabd56",
    },
    resultMsg: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textSize: "30px",
    },
  };

  return (
    <div style={styles.topView}>
      <div style={styles.profile}>
        <img
          src={`https://opgg-static.akamaized.net/images/borders2/${tier.toLowerCase()}.png`}
          alt={"테두리사진"}
          style={styles.profileBorderImage}
        ></img>
        <img
          style={styles.profileImage}
          src={`https://opgg-static.akamaized.net/images/profile_icons/profileIcon${profileIconId}.jpg?image=q_auto&amp;v=1518361200`}
          alt={"프로필사진"}
        ></img>
        <div style={styles.profileIconBelow}>{summonerLevel}</div>
      </div>
      <div style={styles.name}>{summonerName}</div>
    </div>
  );
};

export default TopHeaderBox;
