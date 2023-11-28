const axios = require("axios");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const updateSchedule = async (request, response) => {
	const { email: userEmail } = request.params;
	const { schedule: newSchedule } = request.body;

	const client = new MongoClient(MONGO_URI);

	try {
		await client.connect();

		const result = await client
			.db("mySportsCal")
			.collection("Users")
			.updateOne({ email: userEmail }, { $set: { schedule: newSchedule } });

		if (result.modifiedCount === 1) {
			console.log("Schedule updated successfully");
			response.status(200).json({ message: "Schedule updated successfully" });
		} else {
			console.log("Failed to update schedule");
			response.status(400).json({ message: "Failed to update schedule" });
		}
	} catch (error) {
		console.error(error);
		response.status(500).json({ error: "Internal Server Error" });
	} finally {
		client.close();
	}
};

module.exports = updateSchedule;
