const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;


const getPeople = async (req, res) => {
	const client = new MongoClient(MONGO_URI);

	try {
		await client.connect();
		const result = await client
			.db("mySportsCal")
			.collection("people")
			.find().toArray();

		res.json(result);
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "something went wrong" });
	} finally {
		await client.close();
	}
};

module.exports = getPeople;