const e = require("express");
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Map global peomise - Get rid of warning
mongoose.Promise = global.Promise;
// Connect to momgoose
mongoose
	.connect("mongodb://localhost/videojot-dev", {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log("MongoDB Connected..."))
	.catch((err) => console.log(err));

// Load Idea Model
require("./models/Idea");
const Idea = mongoose.model("ideas");

// Handlebars middleware
app.engine(
	"handlebars",
	exphbs({
		defaultLayout: "main",
	})
);
app.set("view engine", "handlebars");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Index Route
app.get("/", (req, res) => {
	const title = "Welcome!";
	res.render("index", {
		title: title,
	});
});

// About Route
app.get("/about", (req, res) => {
	res.render("about");
});

// Add Idea Form
app.get("/ideas/add", (req, res) => {
	res.render("ideas/add");
});

// Process Form
app.post("/ideas", (req, res) => {
	let errors = [];

	if (!req.body.title) {
		errors.push({ text: "Please add a title" });
	}
	if (!req.body.details) {
		errors.push({ text: "Please add some details" });
	}
	if (errors.length > 0) {
		res.render("ideas/add", {
			errors: errors,
			title: req.body.title,
			details: req.body.details,
		});
	} else {
		res.send("Added!!");
	}
});

const port = 5000;

app.listen(port, () => {
	console.log(`Server started on ${port}`);
});
