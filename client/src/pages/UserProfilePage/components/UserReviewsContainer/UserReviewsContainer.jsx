import * as Styles from "./UserReviewsContainerStyles";
import ReviewCard from "../../../../components/ReviewCard";

function UserReviewsContainer(props) {
	const { userReviews } = props;

	return (
		<Styles.ReviewsSection>
			{userReviews.map((review) => (
				<ReviewCard key={review.id} review={review} />
			))}
		</Styles.ReviewsSection>
	);
}

export default UserReviewsContainer;
