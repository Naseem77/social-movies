const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	movieIMDBId: {
		type: String,
		trim: true,
		required: true,
	},
	movieId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Movie",
		required: true,
	},
	feedback: {
		type: String,
		required: true,
		trim: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Review", ReviewSchema);
