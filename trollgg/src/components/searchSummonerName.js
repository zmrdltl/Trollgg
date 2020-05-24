import React, { useState } from "react";
import axios from "axios";
const searchSummonerName = (props) => {
  const [name, setName] = useState("");
  const [isSubmitted, setIssumbitted] = useState(false);
  const [league, setLeague] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var res = await axios.get(
      "http://ec2-54-180-82-172.ap-northeast-2.compute.amazonaws.com:4000/api/user/league?summonerName=" +
        name
    );
    console.log(res);
    var resJSON = JSON.parse(res.data);
    console.log(resJSON);
    setLeague(resJSON.summonerName + resJSON.tier + resJSON.rank);
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
          <div>{league}</div>
        </div>
      )}
    </div>
  );
};

export default searchSummonerName;
