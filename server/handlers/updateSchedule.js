const axios = require("axios");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const updateSchedule = async (email, newSchedule) => {
	const client = new MongoClient(MONGO_URI);

	try {
		await client.connect();

		const result = await client
			.db("mySportsCal")
			.collection("Users")
			.updateOne({ email }, { $set: { schedule: newSchedule } });

		if (result.modifiedCount === 1) {
			console.log("Schedule updated successfully");
		} else {
			console.log("Failed to update schedule");
		}
	} catch (error) {
		console.error(error);
	} finally {
		client.close();
	}
};

module.exports= updateSchedule