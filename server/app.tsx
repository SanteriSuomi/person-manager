import express from "express";
import path from "path";
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/", (_, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.get("/world", (req, res) => {
	res.send("Hello World!");
});

app.listen(PORT, () => {
	return console.log(`Express is listening at http://localhost:${PORT}`);
});
