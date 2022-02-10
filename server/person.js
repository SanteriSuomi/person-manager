"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const middleware_1 = __importDefault(require("./middleware"));
const router = express_1.default.Router();
router.use(middleware_1.default.authorize);
// Get all users
router.get("/all", (_, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query("SELECT * FROM person;", []);
        return response.status(200).send(result.rows);
    }
    catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}));
// Just a helper function because two route functions below used very similar bodies.
function fromQuery(dbQuery, request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, firstname, surname, age } = request.query;
        if (!(id || firstname || surname || age)) {
            return response
                .status(400)
                .send("Give either id, firstname, lastname or age in query");
        }
        try {
            const result = yield db_1.default.query(dbQuery, [id, firstname, surname, age]);
            return response.status(200).send(result.rows);
        }
        catch (error) {
            console.log(error);
            return response.status(500).send(error);
        }
    });
}
// Get a single user
router.get("/single", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    return fromQuery("SELECT * FROM person WHERE id=$1 OR firstname=$2 OR surname=$3 OR age=$4;", request, response);
}));
// Delete a user
router.delete("/delete", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    return fromQuery("DELETE FROM person WHERE id=$1 OR firstname=$2 OR surname=$3 OR age=$4;", request, response);
}));
router.post("/new", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, surname, age } = request.body;
    if (!(firstname && surname && age)) {
        return response
            .status(400)
            .send("Give valid person object in request body");
    }
    try {
        const checkExisting = yield db_1.default.query("SELECT * FROM person WHERE firstname=$1 AND surname=$2 AND age=$3;", [firstname, surname, age]);
        if (checkExisting.rows.length > 0) {
            return response.status(405).send("This person exists already");
        }
        const result = yield db_1.default.query("INSERT INTO person (firstname, surname, age) VALUES($1, $2, $3);", [firstname, surname, age]);
        return response.status(201).send(result.rows);
    }
    catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}));
// Update the details of a single person
router.put("/update", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: queryId, firstname: queryFirstname, surname: querySurname, age: queryAge, } = request.query;
    if (!(queryId || queryFirstname || querySurname || queryAge)) {
        return response
            .status(400)
            .send("Give either id, firstname, lastname or age in query");
    }
    const { firstname, surname, age } = request.body;
    if (!(firstname && surname && age)) {
        return response
            .status(400)
            .send("Give valid person object in request body");
    }
    try {
        const checkExisting = yield db_1.default.query("SELECT * FROM person WHERE firstname=$1 AND surname=$2 AND age=$3;", [firstname, surname, age]);
        if (checkExisting.rows.length > 0) {
            return response.status(405).send("This person exists already");
        }
        let result = yield db_1.default.query("SELECT * FROM person WHERE id=$1 OR firstname=$2 OR surname=$3 OR age=$4;", [queryId, queryFirstname, querySurname, queryAge]);
        const existing = result.rows[0];
        result = yield db_1.default.query("UPDATE person SET firstname=$1, surname=$2, age=$3 WHERE id=$4 OR firstname=$5 OR surname=$6 OR age=$7;", [
            firstname ? firstname : existing.firstname,
            surname ? surname : existing.surname,
            age ? age : existing.age,
            queryId,
            queryFirstname,
            querySurname,
            queryAge,
        ]);
        return response.status(200).send(result.rows);
    }
    catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}));
exports.default = router;
