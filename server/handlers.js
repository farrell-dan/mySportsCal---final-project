const eplData = require("./handlers/Leagues/eplData");
const signUp = require("./handlers/signup");
const login = require("./handlers/login");
const updateSchedule = require("./handlers/updateSchedule");
const LaLigaData = require("./handlers/Leagues/LaLigaData");
const bundesligaData = require("./handlers/Leagues/bundeligaData");
const serieAData = require("./handlers/Leagues/serieAData");
const ligue1Data = require("./handlers/Leagues/ligue1Data");
const championsLeagueData = require("./handlers/Leagues/championsLeagueData");
const europaLeagueData = require("./handlers/Leagues/europaLeagueData");
const mySchedule = require("./handlers/mySchedule");
const removeGameFromSchedule = require("./handlers/removeGame");
const nbaData = require("./handlers/Leagues/nbaData");
const nflData = require("./handlers/Leagues/nhlData");
const nhlData = require("./handlers/Leagues/nhlData");

module.exports = {
	eplData,
	LaLigaData,
	bundesligaData,
	championsLeagueData,
	europaLeagueData,
	ligue1Data,
	serieAData,
	nflData,
	nbaData,
	nhlData,
	signUp,
	login,
	updateSchedule,
	mySchedule,
	removeGameFromSchedule,
};
