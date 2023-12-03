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
} = require("./handlers");

app.use(express.json());

//gets for the different leagues
app.get("/api/Premier%20League", eplData);
app.get("/api/La%20Liga", LaLigaData);
app.get("/api/Bundesliga", bundesligaData);
app.get("/api/Serie%20A", serieAData);
app.get("/api/Ligue%201", ligue1Data);
app.get("/api/UEFA%20Champions%20League", championsLeagueData);
app.get("/api/UEFA%20Europa%20League", europaLeagueData);

//Account APIs
app.post("/api/signup", signUp);
app.post("/api/login", login);

//schedule APIs
app.patch("/api/update/:email", updateSchedule);
app.get("/api/mySchedule/:email", mySchedule);
app.delete("/api/removeGame/:email/:matchNumber", removeGameFromSchedule);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
