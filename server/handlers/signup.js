const axios = require("axios");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const signUp = async (req, res) => {
	const { fullName, email, password } = req.body;
	const client = new MongoClient(MONGO_URI);

	try {
		await client.connect();
		const result = await client
			.db("mySportsCal")
			.collection("Users")
			.findOne({ email });

		if (result) {
			return res.status(400).json({ message: "Email already exists" });
		}
		const hashPassword = await bcrypt.hash(password, 10);

		const resultOfInsertion = await client
			.db("mySportsCal")
			.collection("Users")
			.insertOne({
				_id: email,
				email,
				fullName,
				password: hashPassword,
				schedule: [],
			});

		if (resultOfInsertion.insertedId) {
			return res.status(200).json({ message: "Account creation successful" });
		} else {
			return res.status(400).json({ message: "something went wrong" });
		}
	} catch (error) {
		console.log(error);
	} finally {
		client.close();
	}
};
module.exports = signUp;
