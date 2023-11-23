
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const login = async (req, res) => {
	const { email, password } = req.body;
	const client = new MongoClient(MONGO_URI);

	try {
		await client.connect();
		const result = await client
			.db("mySportsCal")
			.collection("Users")
			.findOne({ email });

		if (!result) {
			return res.status(400).json({ message: "Email does not exists" });
		}

        const comparedPassword = await bcrypt.compare(password, result.password)

        if(comparedPassword) {
            return res.status(200).json({message: "Logged in"});
        } else {
            return res.status(400).json({ message: "login error"});
        }

	} catch (error) {
		console.log(error);
	} finally {
		client.close();
	}
};
module.exports = login;
