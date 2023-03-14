const express = require("express");
const htmlRoutes = require('./routes');
const path = require('path');
const fs = require("fs");


const app = express();

const PORT = process.env.PORT || 3001;

const root = path.resolve();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use (express.static(__dirname));
app.use('/', htmlRoutes);

const createUniqueId = () => {
	return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1)
}

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/pages/index.html"))
})

app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "/pages/notes.html"))
})


app.get("/api/notes", (req, res) => {
	const notes = JSON.parse(fs.readFileSync("/db/db.json", "utf8"))
	res.status(200).json(notes)
})


app.post("/api/notes", (req, res) => {
	const { title, text } = req.body
	if (title && text) {
		const notes = JSON.parse(fs.readFileSync("/db/db.json", "utf8"))
		const newNote = {
			id: createUniqueId(),
			title,
			text,
		}
		console.log(newNote)
		notes.push(newNote)
		fs.writeFileSync("/db/db.json", JSON.stringify(notes))
		res.status(201).json(notes)
	} else {
		res.status(500).json("Oops, something went wrong.")
	}
})

app.delete("/api/notes/:id", (req, res) => {
	const noteId = req.params.id
	if (noteId) {
		const notes = JSON.parse(fs.readFileSync("/db/db.json", "utf8"))
		let index = notes.findIndex(note => note.id === noteId)
		if (index !== -1) notes.splice(index, 1)
		fs.writeFileSync("/db/db.json", JSON.stringify(notes))
		res.status(200).json(notes)
	} else {
		res.status(500).json("Oops, something went wrong.")
	}
})

app.listen(PORT, () => {
    console.log(`API server is ready on port ${PORT}!`);
});