const e = require("express");
const express = require("express");
const exphbs = require("express-handlebars");
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

const port = 5000;

app.listen(port, () => {
	console.log(`Server started on ${port}`);
});
