const axios = require("axios");

const API_KEY = process.env.SOCIAL_MOVIES_EXTERNAL_MOVIES_API_KEY;
const POSTER_IMAGE_URL_PREFIX = "https://image.tmdb.org/t/p/w200/";
const COVER_IMAGE_URL_PREFIX = "https://image.tmdb.org/t/p/original/";

exports.searchMovies = async (query) => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`
	);
	return response.data.results.map((movie) => ({
		id: movie.id,
		title: movie.title,
		posterImageURL: POSTER_IMAGE_URL_PREFIX + movie.poster_path,
		IMDBRating: movie.vote_average,
		releaseDate: new Date(movie.release_date),
	}));
};

exports.getMovieDetails = async (movieId) => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
		);
		const movie = response.data;
		return {
			IMDBId: movie.imdb_id,
			title: movie.title,
			posterImageURL:
				movie.poster_path !== null
					? POSTER_IMAGE_URL_PREFIX + movie.poster_path
					: null,
			coverImageURL:
				movie.backdrop_path !== null
					? COVER_IMAGE_URL_PREFIX + movie.backdrop_path
					: null,
			overview: movie.overview,
			IMDBRating: movie.vote_average,
			releaseDate: new Date(movie.release_date),
		};
	} catch (e) {
		return null;
	}
};
