const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const PORT = 8888

const app = express();

const {getPeople, eplData} = require("./handlers")

app.get("/api/test", (req, res) => {
    res.json({message: "You hit the end point!"})
})

app.get("/api/testMongo", async (req, res) => {
	const client = new MongoClient(MONGO_URI);

	try {
		await client.connect();
		const result = await client
			.db("mySportsCal")
			.collection("people")
			.insertOne({ name: "Dimmy" });

		res.json(result);
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "something went wrong" });
	} finally {
		await client.close();
	}
});

app.get("/api/people", getPeople);

app.get("/api/epl-data", eplData)

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});