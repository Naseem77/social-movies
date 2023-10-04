const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
	IMDBId: {
		type: String,
		required: true,
		trim: true,
	},
	title: {
		type: String,
		required: true,
		trim: true,
	},
	posterImageURL: {
		type: String,
		required: true,
		trim: true,
	},
	coverImageURL: {
		type: String,
		required: true,
		trim: true,
	},
	overview: {
		type: String,
		required: true,
		trim: true,
	},
	IMDBRating: {
		type: Number,
		required: true,
	},
	releaseDate: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Movie", MovieSchema);
