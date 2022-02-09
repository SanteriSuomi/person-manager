"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const person_1 = __importDefault(require("./person"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../client/build")));
app.use(express_1.default.json());
app.use("/person", person_1.default);
app.get("/", (_, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../client/build", "index.html"));
});
app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});
