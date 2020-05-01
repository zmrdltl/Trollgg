import React, { useState } from "react";
import axios from "axios";

const InputText = (props) => {
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const [isSubmitted, setIssumbitted] = useState(false);
  const [league, setLeague] = useState("");

  const handleSubmit = async (e) => {
    await axios.get(
      "http://ec2-54-180-82-172.ap-northeast-2.compute.amazonaws.com:4000/api/user/league?summonerName=" +
        name
      // {
      //   params: {
      //     name,
      //   },
      // }
    );
    setIssumbitted(true);
  };

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

      <button type="submit" onClick={handleSubmit}>
        제출
      </button>

      {isSubmitted && <div>{league}</div>}
    </div>
  );
};

export default InputText;
