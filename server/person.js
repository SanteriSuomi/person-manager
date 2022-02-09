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
const router = express_1.default.Router();
// Get all users
router.get("/all", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query("SELECT * FROM person;", []);
        return response.status(200).send(result.rows);
    }
    catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}));
// Get a single user
router.get("/single", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, firstname, surname } = request.query;
    console.log(request.query);
    if (!(id || firstname || surname)) {
        return response
            .status(400)
            .send("Give either id, firstname or lastname in query");
    }
    try {
        const result = yield db_1.default.query("SELECT * FROM person WHERE id=$1 OR firstname=$2 OR surname=$3;", [id, firstname, surname]);
        return response.status(200).send(result.rows);
    }
    catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
}));
// Delete a user
router.delete("/delete", (res, req) => __awaiter(void 0, void 0, void 0, function* () { }));
// Update the details of a single person
router.put("/update", (res, req) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.default = router;
