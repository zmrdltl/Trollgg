import React from "react";
import * as fetch from "./fetch";

// const apiUrl =
//   "http://ec2-52-78-119-98.ap-northeast-2.compute.amazonaws.com:4000/api/";
const apiUrl = "http://localhost:4000/api/";

export const getChampList = () => {
  const url = `https://ddragon.leagueoflegends.com/cdn/10.9.1/data/ko_KR/champion.json`;
  return fetch
    .getServer(url)
    .then((res) => res.json())
    .catch((err) => ({ err }));
};

export const getSpellList = () => {
  const url = `https://ddragon.leagueoflegends.com/cdn/10.9.1/data/en_US/summoner.json`;
  return fetch
    .getServer(url)
    .then((res) => res.json())
    .catch((err) => ({ err }));
};

export const getRiotSummoner = (data) => {
  const url = `${apiUrl}user/riotSummoner?summonerName=`;
  return fetch
    .getServer(url, data)
    .then((res) => JSON.parse(res))
    .catch((err) => ({ err }));
};

export const getRiotLeague = (data) => {
  const url = `${apiUrl}user/riotLeague?id=`;
  return fetch
    .getServer(url, data)
    .then((res) => JSON.parse(res))
    .catch((err) => ({ err }));
};

export const getRiotMatchList = (data) => {
  const url = `${apiUrl}user/riotMatchlist?`;
  return fetch
    .getServerForMatchList(url, data)
    .then((res) => JSON.parse(res))
    .catch((err) => ({ err }));
};

export const getRiotMatch = (data) => {
  const url = `${apiUrl}match/riotMatches?gameId=`;
  return fetch
    .getServer(url, data)
    .then((res) => JSON.parse(res))
    .catch((err) => ({ err }));
};

export const getRiotTimelines = (data) => {
  const url = `${apiUrl}match/riotTimelines`;
  return fetch
    .getServer(url, data)
    .then((res) => JSON.parse(res))
    .catch((err) => ({ err }));
};

export const getLeague = (data) => {
  const url = `${apiUrl}user/league`;
  return fetch
    .getServer(url, data)
    .then((res) => JSON.parse(res))
    .catch((err) => ({ err }));
};

export const getRiotLeagues = (data) => {
  const url = `${apiUrl}user/riotLeagues?leagueId=`;
  return fetch
    .getServer(url, data)
    .then((res) => JSON.parse(res))
    .catch((err) => ({ err }));
};

export const getSummoner = (data) => {
  const url = `${apiUrl}user/summoner`;
  return fetch
    .getServer(url, data)
    .then((res) => JSON.parse(res))
    .catch((err) => ({ err }));
};

export const getMatchlist = (data) => {
  const url = `${apiUrl}user/matchlist`;
  return fetch
    .getServer(url, data)
    .then((res) => JSON.parse(res))
    .catch((err) => ({ err }));
};

export const getTeams = (data) => {
  const url = `${apiUrl}match/matches/teams`;
  return fetch
    .getServer(url, data)
    .then((res) => JSON.parse(res))
    .catch((err) => ({ err }));
};

export const getParticipantIdentities = (data) => {
  const url = `${apiUrl}match/matches/participantIdentities`;
  return fetch
    .getServer(url, data)
    .then((res) => JSON.parse(res))
    .catch((err) => ({ err }));
};

export const getParticipants = (data) => {
  const url = `${apiUrl}match/matches/participants`;
  return fetch
    .getServer(url, data)
    .then((res) => res)
    .catch((err) => ({ err }));
};

export const getopMost7Pick = (data) => {
  const url = `${apiUrl}user/opMost7Pick?summonerName=`;
  return fetch
    .getServer(url, data)
    .then((res) => res)
    .catch((err) => ({ err }));
};

export const getTrollScore = (data) => {
  const url = `${apiUrl}user/trollScore?summonerName=`;
  return fetch
    .getServer(url, data)
    .then((res) => res)
    .catch((err) => ({ err }));
};
