require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const AuthRoutes = require("./api/routes/auth_routes");
const MoviesRoutes = require("./api/routes/movies_routes");
const UsersRoutes = require("./api/routes/users_routes");

const app = express();

const connectionParams = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
mongoose
	.connect(process.env.SOCIAL_MOVIES_DATABASE_URL, connectionParams)
	.then(() => {
		console.log("Connected to the database ");
	})
	.catch((err) => {
		console.error(`Error connecting to the database. n${err}`);
	});

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthRoutes);
app.use("/api/movies", MoviesRoutes);
app.use("/api/users", UsersRoutes);

app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.SOCIAL_MOVIES_PORT || 5000;
app.listen(PORT, () => {
	console.log(`server up and running on port ${PORT}`);
});
