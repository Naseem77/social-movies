import axios from "axios";

class MoviesService {
	static getMovieDetails(movieId) {
		return axios.get(`/api/movies/${movieId}`);
	}
	static getReviews() {
		return axios.get("/api/movies/reviews");
	}
	static searchMovie(query) {
		return axios.get(`/api/movies/search?query=${query}`);
	}
	static addReview(reviewData) {
		return axios.post("/api/movies/reviews", reviewData);
	}
	static deleteReview(reviewId) {
		return axios.delete(`/api/movies/reviews/${reviewId}`);
	}
}

export default MoviesService;
