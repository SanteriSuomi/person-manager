import express from "express";
import db from "./db";

const router = express.Router();

// Get all users
router.get("/all", async (request, response) => {
	try {
		const result = await db.query("SELECT * FROM person;", []);
		return response.status(200).send(result.rows);
	} catch (error) {
		console.log(error);
		return response.status(500).send(error);
	}
});

// Get a single user
router.get("/single", async (request, response) => {
	const { id, firstname, surname, age } = request.query;
	if (!(id || firstname || surname || age)) {
		return response
			.status(400)
			.send("Give either id, firstname, lastname or age in query");
	}
	try {
		const result = await db.query(
			"SELECT * FROM person WHERE id=$1 OR firstname=$2 OR surname=$3 OR age=$4;",
			[id, firstname, surname, age]
		);
		return response.status(200).send(result.rows);
	} catch (error) {
		console.log(error);
		return response.status(500).send(error);
	}
});

// Delete a user
router.delete("/delete", async (res, req) => {});

// Update the details of a single person
router.put("/update", async (res, req) => {});

export default router;
