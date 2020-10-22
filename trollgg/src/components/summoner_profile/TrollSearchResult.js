import React, { useState, useEffect } from "react";
import Emblem_Bronze from "../../assets/ranked_emblems/Emblem_Bronze.png";
import axios from "axios";
import queryString from "query-string";
import ProgressBar from "../../container/ProgressBar";
import SideContents from "./side_contents/SideContents";
import MainContents from "./main_contents/MainContents";
import * as API from "../../api/API";
//행패성 leagueId: "54fb7852-29f5-44ac-8454-7a45a0b787d3"
//queueType: "RANKED_SOLO_5x5"
//rank: "로마숫자"
//encryptedSummornerId-> summonerId: "EuBfqKp2DfCRLTUqZlyD3oq25KWG5TJEAh0osQE6QtrVRA"
const TrollSearchResult = ({ location, match }) => {
  const query = queryString.parse(location.search);
  const [isSubmitted, setIssumbitted] = useState(false);
  const [league, setLeagueData] = useState("");
  const [matchList, setMatchList] = useState([]);
  const summonerName = query.name;
  const trollPercent = 70;
  const urlHeader =
    "ec2-52-78-119-98.ap-northeast-2.compute.amazonaws.com:4000";

  const handleSubmit = async (e) => {
    e.preventDefault(); //기존 페이지 flush 안하는 코드
    console.log("submit!");
    setMatchList([]);
    //league res
    const leagueRes = await axios.get(
      urlHeader + "/user/league?TrollSearchResult=" + summonerName
    );
    console.log("난 됨");
    // console.log(leagueRes);
    const matchRes = await axios.get(
      urlHeader + "/user/matchlist?TrollSearchResult=" + summonerName
    );

    let accountId = await axios.get(
      urlHeader + "/user/accountId?TrollSearchResult=" + summonerName
    );

    let summoner = await axios.get(
      urlHeader + "/user/summoner?TrollSearchResult=" + summonerName
    );
    console.log(matchRes);

    const leagueData = JSON.parse(leagueRes.data);
    let latestTenMatch = JSON.parse(matchRes.data);
    //한게임에
    for (const i = 0; i < 10; i++) {
      const matchinfo = new Array();

      //10명의 참여자
      const matchRes = await axios.get(
        urlHeader +
          "/match/matches/participantIdentities?gameId=" +
          latestTenMatch[i].gameId
      );

      const res = await axios.get(
        urlHeader +
          "/match/matches/participants?gameId=" +
          latestTenMatch[i].gameId
      );

      const participants = JSON.parse(res.data);
      matchRes = matchRes.data;
      const matchDataJson = JSON.parse(matchRes);

      for (const j = 0; j < 10; j++) {
        let championId = participants[j].championId;
        let participantId = participants[j].participantId;
        let spell1Id = participants[j].spell1Id;
        let spell2Id = participants[j].spell2Id;
        matchinfo.push({
          championId,
          participantId,
          spell1Id,
          spell2Id,
        });
      }
      setMatchList((matchList) => [...matchList, matchinfo]);
    }

    console.log(matchList);
    setLeagueData(leagueData);
    //개인정보 저장
    setIssumbitted(true);
  };

  const init = async () => {
    const summonerRes = await API.getRiotSummoner({ summonerName });
    if (summonerRes.err) {
      return <h1>등록된 유저가 없습니다. 소환사 이름을 확인해 주세요.</h1>;
    }
    console.log("API호출결과", summonerRes);
  };

  const showResultMessage = (trollScore) => {
    const msgCase = {
      msg1: "선량한 시민입니다",
      msg2: "화가나면 악마가 됩니다. 주의하세요.",
      msg3: "디아블로 그 자체. 나가셔야합니다.",
    };
    let resultMsg;
    if (trollScore <= 33) {
      resultMsg = msgCase.msg1;
    } else if (33 <= trollScore && trollScore <= 66) {
      resultMsg = msgCase.msg2;
    } else {
      resultMsg = msgCase.msg3;
    }
    return <div>{resultMsg}</div>;
  };

  init();
  return (
    <div style={styles.container}>
      <div style={styles.topView}>
        <div style={styles.profile}>
          <img
            src={Emblem_Bronze}
            alt="챌린저"
            title="챌린저"
            width="100%"
            height="100%"
          ></img>
        </div>
        <div style={styles.progressBarContainer}>
          {summonerName}
          <h2>Troll 위험도</h2>
          <ProgressBar
            bgcolor={"#6a1b9a"}
            trollPercent={trollPercent}
            opacity={1}
          />
        </div>
        {showResultMessage(trollPercent)}
      </div>

      <div style={styles.content}>
        <SideContents />
        <MainContents />
      </div>
    </div>
  );
};

export default TrollSearchResult;

const styles = {
  container: {
    display: "block",
    width: "100%",
    height: "100%",
    padding: "20px 20px 0 20px", //margin,padding: 상우하좌 순
    fontFamily: "Montserrat",
  },
  topView: { display: "flex", width: "1000px", margin: "0 auto" },
  progressBarContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "500px",
  },

  profile: {
    position: "relative",
    height: "120px",
    width: "120px",
  },
  content: {
    display: "flex",
    width: "1000px",
    minHeight: "500px",
    margin: "0 auto",
    marginTop: "10px",
  },
};
