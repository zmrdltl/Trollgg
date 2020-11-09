import React, { useEffect, useState } from "react";
import * as API from "../../../api/API";
import { champList } from "../../../assets/index";
const showStats = (most7PickInfo, styles, champList) => {
  const getWinFont = (winRate) => {
    if (0 <= winRate && winRate < 60) {
      return "#879292";
    }
    return "#c6443e";
  };
  const getKDAFont = (kda) => {
    if (0 <= kda && kda < 3) {
      return "#879292"; //검
    } else if (3 <= kda && kda < 4) {
      return "#2daf7f"; //초
    } else if (4 <= kda && kda < 5) {
      return "#1f8ecd"; //파
    } else {
      return "#e19205"; //노
    }
  };
  const makeStats = () => {
    const statList = [];
    for (let i = 0; i < most7PickInfo.length; i++) {
      let tmpName = "";
      if (most7PickInfo[i].champName === "Nunu & Willump") tmpName = "Nunu";
      else tmpName = most7PickInfo[i].champName.replace(" ", "");

      const enChampName = tmpName;
      let koChampName =
        champList.data[enChampName] === undefined
          ? ""
          : champList.data[enChampName].name;
      if (enChampName === "Yone") koChampName = "요네";
      const cs = most7PickInfo[i].cs;
      const KDA = most7PickInfo[i].KDA;
      const kills = most7PickInfo[i].kills;
      const deaths = most7PickInfo[i].deaths;
      const assists = most7PickInfo[i].assists;
      const winRate = most7PickInfo[i].winRate;
      const played = most7PickInfo[i].played;
      const winFont = getWinFont(parseFloat(winRate));
      const KDAFont = getKDAFont(parseFloat(KDA));
      statList.push(
        <div style={styles.oneStatBox}>
          <div style={styles.statBox}>
            <div>
              <img
                style={styles.champImage}
                src={`https://opgg-static.akamaized.net/images/lol/champion/${enChampName}.png?image=q_auto,w_45&v=1603864069`}
                alt={enChampName}
              ></img>
            </div>

            <div style={styles.box1}>
              <div style={styles.champName}>{koChampName}</div>
              <div style={styles.lowFont}>{cs}</div>
            </div>

            <div style={styles.box2}>
              <div style={{ color: KDAFont, fontWeight: "bold" }}>
                {`${KDA} 평점`}
              </div>
              <div
                style={styles.lowFont}
              >{`${kills} / ${deaths} / ${assists}`}</div>
            </div>

            <div style={styles.box3}>
              <div style={{ color: winFont }}>{winRate}</div>
              <div style={styles.lowFont}>{played}</div>
            </div>
          </div>
        </div>
      );
    }
    statList.sort((a, b) => {
      if (a.played === b.played) return b.winRate - a.winRate;
      return b.played - a.played;
    });
    return statList;
  };

  return <div>{makeStats().map((val) => val)}</div>;
};

const MostPickInfoBox = (props) => {
  const { summonerRes, leagueRes } = props;
  const summonerName = summonerRes.name;
  const [most7PickInfo, setMost7PickInfo] = useState([]);
  const mineData = async (summonerName) => {
    const most7PickInfo = await API.getopMost7Pick(summonerName);
    setMost7PickInfo(most7PickInfo);
  };

  useEffect(() => {
    mineData(summonerName);
  }, [summonerName]);

  return (
    <div>
      <div style={styles.topBox}> S2020전체 </div>
      {showStats(most7PickInfo, styles, champList)}
    </div>
  );
};

export default MostPickInfoBox;

const styles = {
  oneStatBox: {
    display: "flex",
    border: "1px solid #cdd2d2",
    boxShadow: "0 1px #dcdfdf",
    background: "#f2f2f2",
    borderRadius: "2px",
    width: "300px",
    height: "60px",
    alignItems: "center",
    justifyContent: "center",
  },
  champImage: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  statBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#879292",
  },
  topBox: {
    display: "flex",
    paddingTop: "7px",
    fontSize: "12px",
    lineHeight: "15px",
    paddingBottom: "6px",
    textDecoration: "none",
    boxSizing: "border-box",
    borderBottomColor: "#ededed",
    backgroundColor: "#ededed",
    color: "#555e5e",
    fontWeight: "bold",
    width: "99px",
    height: "43px",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    border: "1px solid #cdd2d2",
  },
  champName: {
    color: "#555e5e",
    fontWeight: "bold",
    fontSize: "13px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "100%",
    height: "17px",
  },
  lowFont: {
    width: "70px",
    height: "17px",
    fontSize: "10px",
  },
  box1: {
    display: "block",
    width: "80px",
    verticalAlign: "middle",
  },
  box2: {
    display: "block",
    width: "80px",
    verticalAlign: "middle",
    alignItems: "center",
    fontSize: "13px",
  },
  box3: {
    display: "block",
    width: "50px",
    verticalAlign: "middle",
    fontSize: "13px",
    fontWeight: "bold",
  },
};
