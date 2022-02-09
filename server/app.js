"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.port || 8000;
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../client/build")));
app.get("/", (_, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../client/build", "index.html"));
});
app.get("/world", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
