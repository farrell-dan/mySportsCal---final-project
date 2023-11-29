const express = require("express");

const PORT = 8888;

const app = express();

const { eplData, signUp, login, LaLigaData, bundesligaData, serieAData, ligue1Data, championsLeagueData, europaLeagueData, updateSchedule } = require("./handlers");

app.use(express.json());

//gets for the different leagues
app.get("/api/epl", eplData);
app.get("/api/laliga", LaLigaData)
app.get("/api/bundesliga", bundesligaData)
app.get("/api/seriea", serieAData)
app.get("/api/ligue1", ligue1Data)
app.get("/api/uefachampionsleague", championsLeagueData)
app.get("/api/uel", europaLeagueData)

//posts for the account stuff
app.post("/api/signup", signUp);
app.post("/api/login", login);

app.patch("/api/update/:email", updateSchedule)



app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
