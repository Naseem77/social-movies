const Joi = require("joi");
const FormatUtils = require("../utils/format_utils");
const MoviesService = require("../services/movies_service");
const ReviewModel = require("../models/review_model");
const MovieModel = require("../models/movie_model");
const UserModel = require("../models/user_model");

async function getMoviesAppRating() {
	let moviesAppRating = await ReviewModel.aggregate([
		{ $group: { _id: "$movieIMDBId", appRating: { $avg: "$rating" } } },
	]);
	moviesAppRating = moviesAppRating.map((movieRating) => ({
		...movieRating,
		appRating: parseFloat(movieRating.appRating.toFixed(1)),
	}));
	return moviesAppRating;
}

async function getIndivisualMovieAppRating(movieIMDBId) {
	const moviesAppRating = await getMoviesAppRating();
	const movieRating = moviesAppRating.find(
		(rating) => rating._id === movieIMDBId
	);
	if (movieRating === undefined) {
		return null;
	}
	return movieRating.appRating;
}

async function updateLocalMovieDetails(movie) {
	await MovieModel.updateOne({ IMDBId: movie.IMDBId }, movie);
}

const searchValidationObject = {
	query: Joi.string().max(60).required(),
};

function validateSearch(query) {
	const schema = Joi.object(searchValidationObject);
	return schema.validate(query, { abortEarly: false, allowUnknown: true });
}

function validateAddReview(data) {
	const movieSchema = Joi.object({
		IMDBId: Joi.string().required().label("IMDBId"),
		title: Joi.string().min(3).required().label("title"),
		posterImageURL: Joi.string().required().label("posterImageURL"),
		coverImageURL: Joi.string().required().label("coverImageURL"),
		overview: Joi.string().min(6).required().label("overview"),
		IMDBRating: Joi.number().required().label("IMDBRating"),
		releaseDate: Joi.date().required().label("releaseDate"),
	});
	const schema = Joi.object({
		rating: Joi.number().min(0).max(10).required().label("rating"),
		feedback: Joi.string().min(3).required().label("feedback"),
		movie: movieSchema,
	});

	return schema.validate(data, { abortEarly: false, allowUnknown: true });
}

exports.searchMovies = async (req, res) => {
	try {
		const { query } = req.query;
		const { error, value } = validateSearch(req.query);
		const validationErrors = FormatUtils.formatValidation(error);
		if (validationErrors) {
			return res
				.status(400)
				.json({ success: false, errors: validationErrors });
		}
		const results = await MoviesService.searchMovies(query);
		res.status(200).json({
			success: true,
			data: results,
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.getMovieDetails = async (req, res) => {
	try {
		const movieId = req.params.movieId;
		const movie = await MoviesService.getMovieDetails(movieId);
		if (!movie) {
			return res.status(404).json({
				success: false,
				errors: [
					{
						field: "movieId",
						message: "could not find movie with this id",
					},
				],
			});
		}
		const movieAppRating = await getIndivisualMovieAppRating(movie.IMDBId);
		movie.appRating = movieAppRating;
		await updateLocalMovieDetails(movie);

		let movieReviews = await ReviewModel.find({
			movieIMDBId: movie.IMDBId,
		})
			.sort({ createdAt: -1 })
			.populate(["userId", "movieId"]);

		movieReviews = movieReviews.map((review = FormatUtils.formatReview));
		const activeUserReviewIndex = movieReviews.findIndex(
			(review) => review.user.id.toString() === req.userData.id
		);
		const activeUserReview = movieReviews[activeUserReviewIndex];
		if (activeUserReview) {
			movieReviews.splice(activeUserReviewIndex, 1);
			movieReviews.unshift(activeUserReview);
		}
		movie.activeUserReview = activeUserReview ?? null;
		movie.reviews = movieReviews;
		res.status(200).json({ success: true, data: movie });
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.getReviews = async (req, res) => {
	try {
		const user = req.userData;
		const updatedUserData = await UserModel.findById(user.id);

		let reviewsList = await ReviewModel.find({
			userId: updatedUserData.followingList,
		})
			.sort({ createdAt: -1 })
			.populate(["userId", "movieId"]);

		reviewsList = reviewsList.map(FormatUtils.formatReview);
		res.status(200).json({
			success: true,
			data: reviewsList,
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.addReview = async (req, res) => {
	try {
		const { error, value } = validateAddReview(req.body);
		const validationErrors = FormatUtils.formatValidation(error);
		if (error) {
			return res
				.status(400)
				.json({ success: false, errors: validationErrors });
		}

		const userId = req.userData.id;
		const userReview = await ReviewModel.findOne({
			userId: userId,
			movieIMDBId: req.body.movie.IMDBId,
		});

		if (userReview) {
			return res.status(409).json({
				success: false,
				errors: [
					{
						field: "userReview",
						message: "user already created a review for this movie",
					},
				],
			});
		}

		const movie = await MovieModel.findOne({
			IMDBId: req.body.movie.IMDBId,
		});

		let movieId;
		if (movie) {
			movieId = movie._id.toString();
		}
		if (!movie) {
			movieId = new MovieModel(req.body.movie);
			await movieId.save();
			movieId = movieId._id.toString();
		}

		let newUserReview = new ReviewModel({
			userId,
			rating: req.body.rating,
			feedback: req.body.feedback,
			movieIMDBId: req.body.movie.IMDBId,
			movieId: movieId,
		});
		await newUserReview.save();
		let findReviewId = newUserReview._id.toString();

		await UserModel.updateOne(
			{ _id: userId },
			{ $push: { reviews: findReviewId } }
		);

		const formattedReview = FormatUtils.formatReview(newUserReview);

		res.status(201).json({ success: true, addedReview: formattedReview });
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.deleteReview = async (req, res) => {
	try {
		const userId = req.userData.id;
		const reviewId = req.params.movieId;
		if (!reviewId || reviewId.length < 1) {
			return res.status(400).json({
				success: false,
				errors: [
					{
						field: "reviewId",
						message: "invalid reviewId",
					},
				],
			});
		}

		const review = await ReviewModel.findOneAndDelete({
			_id: reviewId,
			userId: userId,
		});
		if (!review) {
			return res.status(404).json({
				success: false,
				errors: [
					{
						field: "review",
						message: "review doesn't exists",
					},
				],
			});
		}

		await UserModel.updateOne(
			{ _id: userId },
			{ $pull: { reviews: reviewId } }
		);

		const formattedReview = FormatUtils.formatReview(review);
		res.status(200).json({ success: true, deletedReview: formattedReview });
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};
