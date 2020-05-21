import React, { useState } from "react";
import axios from "axios";

const InputText = (props) => {
  const [name, setName] = useState("");
  const [isSubmitted, setIssumbitted] = useState(false);
  const [matchlist,setMatchlist] = useState([])
  const [league, setLeague] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    	await setMatchlist([]);
	await foo();
    setIssumbitted(true);
  };

  const foo = async()=>{
    var res = await axios.get(
      "http://ec2-54-180-82-172.ap-northeast-2.compute.amazonaws.com:4000/api/user/league?summonerName=" +
        name
    );
    res = JSON.parse(res.data)
    setLeague(res.summonerName+res.tier+res.rank)

    res = await axios.get(
      'http://ec2-54-180-82-172.ap-northeast-2.compute.amazonaws.com:4000/api/match/matchlist?summonerName=' +
        name
    )
    var matchlistres = JSON.parse(res.data);
    var matchlistJson = new Array();

    for(var i = 0; i<10; i++){
      res = await axios.get(
        'http://ec2-54-180-82-172.ap-northeast-2.compute.amazonaws.com:4000/api/match/matches?gameId=' +
        matchlistres[i].gameId
      )
      matchlistJson.push(JSON.parse(res.data));
    }

    for(var i = 0;i<10;i++){
      var matchinfo = [];
      for(var j =0;j<10;j++){
        let summonerName = matchlistJson[i].participantIdentities[j].player.summonerName;
        let participant =  matchlistJson[i].participants[j];
        let teamId = participant.teamId;
        let championId = participant.stats.championId;
        let spell1Id = participant.spell1Id;
        let spell2Id = participant.spell2Id;
        matchinfo.push({summonerName,teamId,championId,spell1Id,spell2Id});
      }
      setMatchlist(matchlist => [...matchlist,matchinfo]);
    }
  }
  return (
    <div>
      <form>
        <input
          placeholder="소환사 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
        />
      </form>
      <form>
        <button type="submit" onClick={handleSubmit}>
          제출
        </button>
      </form>
      {isSubmitted && <div><div>{league}</div>{JSON.stringify(matchlist)}</div>} 
    </div>
  );
};

export default InputText;
