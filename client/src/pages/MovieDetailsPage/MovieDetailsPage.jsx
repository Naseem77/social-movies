import { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useParams } from "react-router-dom";

import * as Styles from "./MovieDetailsPageStyles";
import MovieRatings from "./components/MovieRatings";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import ErrorView from "../../components/ErrorView";
import ReviewCard from "../../components/ReviewCard";
import AddReviewForm from "./components/AddReviewForm";
import Message from "../../components/Message";

function MovieDetailsPage(props) {
	const { movieId } = useParams();
	const { MoviesStore, UIStore } = props;
	const {
		loading,
		errors,
		success,
		data,
		actionLoading,
		actionErrors,
		actionSuccess,
	} = MoviesStore;
	const movie = data?.selectedMovie;

	useEffect(() => {
		UIStore.setTransparentHeader(true);
		MoviesStore.getMovieDetails(movieId);

		return () => {
			MoviesStore.clearSelectedMovie();
			UIStore.setTransparentHeader(false);
		};
	}, []);

	async function addReview() {
		UIStore.freezeModal();
		await MoviesStore.addReview();
		UIStore.unFreezeModal();
		if (MoviesStore.actionSuccess) {
			UIStore.closeModal();
		}
	}

	function openAddReviewModal() {
		UIStore.openModal({
			isConfirmation: true,
			onConfirm: addReview,
			body: <AddReviewForm />,
		});
	}

	function deleteReview() {
		MoviesStore.deleteReview(movie.activeUserReview.id);
	}

	return (
		<Styles.Root
			expand
			centerHorizontally={loading || errors}
			centerVertically={loading || errors}
		>
			{loading && <Loading />}

			{errors && (
				<ErrorView errorMessage={errors[0]?.message ?? errors} />
			)}

			{movie && (
				<>
					<Styles.CoverImage src={movie.coverImageURL} />
					<Styles.MovieInfo>
						<h1>{movie.title}</h1>
						<p className="p-large">{movie.overview}</p>
						<MovieRatings
							IMDBRating={movie.IMDBRating}
							appRating={movie.appRating}
							activeUserRating={movie.activeUserReview?.rating}
						/>
					</Styles.MovieInfo>

					{movie.activeUserReview &&
						(actionLoading ? (
							<Loading med />
						) : (
							<Button negative onClick={deleteReview}>
								Delete Review
							</Button>
						))}

					{!movie.activeUserReview && (
						<Button onClick={openAddReviewModal}>Add Review</Button>
					)}
					{actionErrors && (
						<Message>
							{actionErrors[0]?.message ?? actionErrors}
						</Message>
					)}

					<Styles.ReviewsSection>
						{movie.reviews.map((review) => (
							<ReviewCard
								key={review.id}
								review={review}
								activeUserReview={movie.activeUserReview}
								hideMovie
							/>
						))}
					</Styles.ReviewsSection>
				</>
			)}
		</Styles.Root>
	);
}

export default inject("MoviesStore", "UIStore")(observer(MovieDetailsPage));
