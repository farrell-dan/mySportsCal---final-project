const express = require("express");

const PORT = 8888;

const app = express();

const { eplData, signUp, login, LaLigaData } = require("./handlers");

app.use(express.json());

//gets for the different leagues
app.get("/api/epl-data", eplData);
app.get("/api/laliga-data", LaLigaData)

//posts for the account stuff
app.post("/api/signup", signUp);
app.post("/api/login", login);



app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
