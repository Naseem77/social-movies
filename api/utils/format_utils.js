exports.formatValidation = (validation) => {
	if (!validation) return;
	return validation.details.map((detail) => ({
		field: detail.context.label,
		message: detail.message,
	}));
};

exports.formatUser = (user, includeFollowers, includeReviews) => {
	return {
		id: user._id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		followingList: user.followingList,
		followersList: includeFollowers ? user.followersList : undefined,
		reviews: includeReviews ? user.reviews : undefined,
	};
};

exports.formatReview = (review) => {
	return {
		id: review._id,
		user: this.formatUser(review.userId),
		movie: {
			id: review.movieId.IMDBId,
			title: review.movieId.title,
			posterImageURL: review.movieId.posterImageURL,
			coverImageURL: review.movieId.coverImageURL,
			overview: review.movieId.overview,
			IMDBRating: review.movieId.IMDBRating,
			releaseDate: review.movieId.releaseDate,
		},
		feedback: review.feedback,
		rating: review.rating,
		createdAt: review.createdAt,
	};
};
