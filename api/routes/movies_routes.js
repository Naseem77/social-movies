const express = require("express");

const MoviesController = require("../controllers/movies_controller");
const checkAuth = require("../middlewares/check_auth");

const router = express.Router();

router.get("/search", checkAuth, MoviesController.searchMovies);

router.get("/reviews", checkAuth, MoviesController.getReviews);

router.get("/:movieId", checkAuth, MoviesController.getMovieDetails);

router.post("/reviews", checkAuth, MoviesController.addReview);

router.delete("/reviews/:movieId", checkAuth, MoviesController.deleteReview);

module.exports = router;
