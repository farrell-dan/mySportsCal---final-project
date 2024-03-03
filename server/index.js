const express = require("express");

const PORT = 8888;

const app = express();

const {
	eplData,
	signUp,
	login,
	LaLigaData,
	bundesligaData,
	serieAData,
	ligue1Data,
	championsLeagueData,
	europaLeagueData,
	updateSchedule,
	mySchedule,
	removeGameFromSchedule,
	nhlData,
	nbaData,
	nflData,
	mlsData,
	eurosData,
	copaAmericaData
} = require("./handlers");

app.use(express.json());

app.get("/api/Premier%20League", eplData);
app.get("/api/La%20Liga", LaLigaData);
app.get("/api/Bundesliga", bundesligaData);
app.get("/api/Serie%20A", serieAData);
app.get("/api/Ligue%201", ligue1Data);
app.get("/api/UEFA%20Champions%20League", championsLeagueData);
app.get("/api/UEFA%20Europa%20League", europaLeagueData);
app.get("/api/UEFA%20Euro%202024", eurosData);
app.get("/api/Copa%20America%202024", copaAmericaData);
app.get("/api/MLS", mlsData);

app.get("/api/NHL", nhlData);
app.get("/api/NBA", nbaData);
app.get("/api/NFL", nflData);

app.post("/api/signup", signUp);
app.post("/api/login", login);

app.patch("/api/update/:email", updateSchedule);
app.get("/api/mySchedule/:email", mySchedule);
app.delete("/api/removeGame/:email/:matchNumber", removeGameFromSchedule);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
