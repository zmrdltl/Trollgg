import React, {
  document,
  useState,
  createElement,
  body,
  tableCreate,
} from "react";
const ResDataTable = (props) => {
  const { leagueData, matchList } = props;
  const summonerName = leagueData.summonerName;
  const tier = leagueData.tier;
  const rank = leagueData.rank;

  return (
    <div>
      <table border="1" summary="한 사람의 matchdata.">
        {" "}
        <tr>
          {" "}
          <th scope="col">소환사이름</th>
          <th scope="col">티어</th> <th scope="col">랭크</th>
          <th scope="col">챔프</th>{" "}
        </tr>{" "}
        <tr>
          {" "}
          <td>{summonerName}</td> <td>{tier}</td> <td>{rank}</td>{" "}
          <td>{matchList.championId}</td>{" "}
        </tr>{" "}
        <tr>
          {" "}
          <td>전지현</td> <td>영문학과</td> <td>80</td> <td>B</td>{" "}
        </tr>{" "}
      </table>
    </div>
  );
};
export default ResDataTable;
