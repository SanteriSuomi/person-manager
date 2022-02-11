import express from "express";
import db from "./db";
import middleware from "./middleware";

const router = express.Router();

router.use(middleware.authorize);

// Get all people
router.get("/all", async (_, response) => {
	try {
		const result = await db.query("SELECT * FROM person;", []);
		return response.status(200).send(result.rows);
	} catch (error) {
		console.log(error);
		return response.status(500).send(error);
	}
});

// Get a single person according to query
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

// Delete a person
router.delete("/delete", async (request, response) => {
	const { id, firstname, surname, age } = request.query;
	if (!(id || firstname || surname || age)) {
		return response
			.status(400)
			.send("Give either id, firstname, lastname or age in query");
	}
	try {
		await db.query(
			"DELETE FROM person WHERE id=$1 OR firstname=$2 OR surname=$3 OR age=$4;",
			[id, firstname, surname, age]
		);
		const result = await db.query("SELECT * FROM person;", []);
		return response.status(200).send(result.rows);
	} catch (error) {
		console.log(error);
		return response.status(500).send(error);
	}
});

// Insert a new person
router.post("/new", async (request, response) => {
	const { firstname, surname, age } = request.body;
	if (!(firstname && surname && age)) {
		return response
			.status(400)
			.send("Give valid person object in request body");
	}
	try {
		const checkExisting = await db.query(
			"SELECT * FROM person WHERE firstname=$1 AND surname=$2 AND age=$3;",
			[firstname, surname, age]
		);
		if (checkExisting.rows.length > 0) {
			return response.status(405).send("This person exists already");
		}
		await db.query(
			"INSERT INTO person (firstname, surname, age) VALUES($1, $2, $3);",
			[firstname, surname, age]
		);
		const result = await db.query("SELECT * FROM person;", []);
		return response.status(201).send(result.rows);
	} catch (error) {
		console.log(error);
		return response.status(500).send(error);
	}
});

// Update the details of a single person. Can update any number of persons' details using a single query.
router.put("/update", async (request, response) => {
	const {
		id: queryId,
		firstname: queryFirstname,
		surname: querySurname,
		age: queryAge,
	} = request.query;
	if (!(queryId || queryFirstname || querySurname || queryAge)) {
		return response
			.status(400)
			.send("Give either id, firstname, lastname or age in query");
	}
	const { firstname, surname, age } = request.body;
	if (!(firstname || surname || age)) {
		return response
			.status(400)
			.send("Give valid person object in request body");
	}
	try {
		let result = await db.query(
			"SELECT * FROM person WHERE id=$1 OR (firstname=$2 AND surname=$3 AND age=$4);",
			[queryId, queryFirstname, querySurname, queryAge]
		);
		if (result.rows.length == 0) {
			return response.status(400).send("This person doesn't exist");
		}
		const existing = result.rows[0];
		await db.query(
			"UPDATE person SET firstname=$1, surname=$2, age=$3 WHERE id=$4 OR (firstname=$5 AND surname=$6 AND age=$7);",
			[
				firstname ? firstname : existing.firstname,
				surname ? surname : existing.surname,
				age ? age : existing.age,
				queryId,
				queryFirstname,
				querySurname,
				queryAge,
			]
		);
		result = await db.query("SELECT * FROM person;", []);
		return response.status(200).send(result.rows);
	} catch (error) {
		console.log(error);
		return response.status(500).send(error);
	}
});

export default router;
