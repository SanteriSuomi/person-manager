import express from "express";
import path from "path";
import person from "./person";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.json());

app.use("/person", person);

app.get("/", (_, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
	return console.log(`Express is listening at http://localhost:${PORT}`);
});
