import { URL_HEADER } from "./Auth";
import axios from "axios";

export const leagueRes = (name) => {
  return axios.get(URL_HEADER + "/user/league?summonerName=" + name);
};

// console.log(leagueRes);
export const matchRes = (name) => {
  return axios.get(URL_HEADER + "/user/matchlist?summonerName=" + name);
};

export const accountId = (name) => {
  return axios.get(URL_HEADER + "/user/accountId?summonerName=" + name);
};

export const summonerName = (name) => {
  return axios.get(URL_HEADER + "/user/summoner?summonerName=" + name);
};
