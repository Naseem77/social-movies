import { useEffect } from "react";
import { inject, observer } from "mobx-react";
import * as Styles from "./HomePageStyles";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import ErrorView from "../../components/ErrorView";
import ReviewCard from "../../components/ReviewCard";

function HomePage(props) {
	const { MoviesStore } = props;
	const { loading, errors, success, data } = MoviesStore;

	useEffect(() => {
		MoviesStore.getReviews();
	}, []);

	return (
		<Container
			expand
			centerHorizontally={loading || errors}
			centerVertically={loading || errors}
		>
			{loading && <Loading />}

			{errors && (
				<ErrorView errorMessage={errors[0]?.message ?? errors} />
			)}

			{data?.reviewsList && (
				<>
					<Styles.ReviewsSection>
						{data.reviewsList.map((review) => (
							<ReviewCard key={review.id} review={review} />
						))}
					</Styles.ReviewsSection>
				</>
			)}
		</Container>
	);
}

export default inject("MoviesStore")(observer(HomePage));
