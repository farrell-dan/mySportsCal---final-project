const axios = require("axios");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const removeGameFromSchedule = async (request, response) => {
	const { email: userEmail, matchNumber } = request.params;

	const client = new MongoClient(MONGO_URI);

	try {
		await client.connect();

		const result = await client
			.db("mySportsCal")
			.collection("Users")
			.updateOne(
				{ email: userEmail },
				{ $pull: { schedule: { MatchNumber: matchNumber } } }
			);

		if (result.modifiedCount === 1) {
			console.log("Game removed from schedule successfully");
			response
				.status(200)
				.json({ message: "Game removed from schedule successfully" });
		} else {
			console.log("Failed to remove game from schedule");
			response
				.status(400)
				.json({ message: "Failed to remove game from schedule" });
		}
	} catch (error) {
		console.error(error);
		response.status(500).json({ error: "Internal Server Error" });
	} finally {
		client.close();
	}
};

module.exports = removeGameFromSchedule;
