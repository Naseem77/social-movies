import * as Styles from "./ReviewCardStyles";
import UserAvatar from "../UserAvatar";
import MovieCard from "../MovieCard/MovieCard";
import MovieRatingContainer from "../MovieRatingContainer";

function ReviewCard(props) {
	const { hideMovie, review, activeUserReview } = props;
	const { id, user, movie, rating, feedback } = review;

	return (
		<Styles.Root>
			{!hideMovie && (
				<Styles.LeftSection>
					<MovieCard movie={movie} />
				</Styles.LeftSection>
			)}

			<Styles.RightSection>
				<Styles.Header>
					<UserAvatar user={user} showInfo />
					{id === activeUserReview?.id && (
						<Styles.DeleteIcon className="material-icons-round">
							cancel
						</Styles.DeleteIcon>
					)}
				</Styles.Header>

				<MovieRatingContainer big>
					<span className="material-icons-round">person</span>
					<p className="p-small bold">{rating}/10</p>
				</MovieRatingContainer>

				<p className="p-small">{feedback}</p>
			</Styles.RightSection>
		</Styles.Root>
	);
}

export default ReviewCard;
