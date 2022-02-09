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

// Just a helper function because two route functions below used very similar bodies.
async function whereQuery(dbQuery: string, request: any, response: any) {
	const { id, firstname, surname, age } = request.query;
	if (!(id || firstname || surname || age)) {
		return response
			.status(400)
			.send("Give either id, firstname, lastname or age in query");
	}
	try {
		const result = await db.query(dbQuery, [id, firstname, surname, age]);
		return response.status(200).send(result.rows);
	} catch (error) {
		console.log(error);
		return response.status(500).send(error);
	}
}

// Get a single user
router.get("/single", async (request, response) => {
	return whereQuery(
		"SELECT * FROM person WHERE id=$1 OR firstname=$2 OR surname=$3 OR age=$4;",
		request,
		response
	);
});

// Delete a user
router.delete("/delete", async (request, response) => {
	return whereQuery(
		"DELETE FROM person WHERE id=$1 OR firstname=$2 OR surname=$3 OR age=$4;",
		request,
		response
	);
});

router.post("/new", async (request, response) => {
	const person = request.body;
	if (!(person.firstname && person.surname && person.age)) {
		return response
			.status(400)
			.send("Give valid person object in request body");
	}
	try {
		const result = await db.query(
			"INSERT INTO person (firstname, surname, age) VALUES($1, $2, $3);",
			[person.firstname, person.surname, person.age]
		);
		return response.status(201).send(result.rows);
	} catch (error) {
		console.log(error);
		return response.status(500).send(error);
	}
});

// Update the details of a single person
router.put("/update", async (request, response) => {
	const { id, firstname, surname, age } = request.query;
	if (!(id || firstname || surname || age)) {
		return response
			.status(400)
			.send("Give either id, firstname, lastname or age in query");
	}
	const person = request.body;
	if (!(person.firstname && person.surname && person.age)) {
		return response
			.status(400)
			.send("Give valid person object in request body");
	}
	try {
		const result = await db.query(
			"UPDATE person SET firstname=$1, surname=$2, age=$3 WHERE id=$4 OR firstname=$5 OR surname=$6 OR age=$7; ",
			[
				person.firstname,
				person.surname,
				person.age,
				id,
				firstname,
				surname,
				age,
			]
		);
		return response.status(200).send(result.rows);
	} catch (error) {
		console.log(error);
		return response.status(500).send(error);
	}
});

export default router;
