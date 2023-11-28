const express = require("express");

const PORT = 8888;

const app = express();

const { eplData, signUp, login, LaLigaData, bundesligaData, serieAData, ligue1Data, championsLeagueData, europaLeagueData, updateSchedule } = require("./handlers");

app.use(express.json());

//gets for the different leagues
app.get("/api/epl-data", eplData);
app.get("/api/laliga-data", LaLigaData)
app.get("/api/bundesliga-data", bundesligaData)
app.get("/api/serie-a-data", serieAData)
app.get("/api/ligue-1-data", ligue1Data)
app.get("/api/champions-league-data", championsLeagueData)
app.get("/api/europa-league-data", europaLeagueData)

//posts for the account stuff
app.post("/api/signup", signUp);
app.post("/api/login", login);

app.patch("/api/update/:email", updateSchedule)



app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
