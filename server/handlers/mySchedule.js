const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const mySchedule = async (request, response) => {
	const { email: userEmail } = request.params;
	const client = new MongoClient(MONGO_URI);

	try {
		await client.connect();

		const result = await client
			.db("mySportsCal")
			.collection("Users")
			.findOne({ email: userEmail });

		if (result) {
			const schedule = result.schedule || [];
			response.json(schedule);
		} else {
			res.status(404).json({ error: "User not found" });
		}
	} catch (error) {
		console.error("Error fetching data:", error);
		response.status(500).json({ error: "Internal Server Error" });
	} finally {
		await client.close();
	}
};

module.exports = mySchedule;
