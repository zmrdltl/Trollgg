import React, { useState } from "react";
import axios from "axios";
import ResDataTable from "./components/resDataTable";
const App = (props) => {
  const [name, setName] = useState("");
  const [isSubmitted, setIssumbitted] = useState(false);
  const [league, setLeagueData] = useState("");
  const [matchList, setMatchList] = useState([]);
  const urlHeader =
    "http://ec2-54-180-82-172.ap-northeast-2.compute.amazonaws.com:4000/api";
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMatchList([]);

    //league res
    var leagueRes = await axios.get(
      urlHeader + "/user/league?summonerName=" + name
    );
    // match res

    var matchRes = await axios.get(
      urlHeader + "/match/matchlist?summonerName=" + name
    );
    var leagueData = JSON.parse(leagueRes.data);
    let latestTenMatch = JSON.parse(matchRes.data);
    var matchListJson = new Array();
    console.log("리그 한게임 ", latestTenMatch[0].gameId);
    //한게임에
    for (var i = 0; i < 10; i++) {
      var matchinfo = new Array();

      //10명의 참여자
      var matchRes = await axios.get(
        urlHeader +
          "/match/matches/participantIdentities?gameId=" +
          latestTenMatch[i].gameId
      );

      var res = await axios.get(
        urlHeader +
          "/match/matches/participants?gameId=" +
          latestTenMatch[i].gameId
      );

      var participants = JSON.parse(res.data);
      matchRes = matchRes.data;
      var matchDataJson = JSON.parse(matchRes);
      console.log(matchDataJson);
      for (var j = 0; j < 10; j++) {
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

  return (
    <div>
      <form>
        <input
          placeholder="소환사 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          name="name"
        />
      </form>

      <form>
        <button type="submit" onClick={handleSubmit}>
          제출
        </button>
      </form>
      {isSubmitted && (
        <div>
          <ResDataTable leagueData={league} matchList={matchList} />
        </div>
      )}
    </div>
  );
};

export default App;
