import { useState } from "react";
import { inject, observer } from "mobx-react";

import * as Styles from "./RatingInputStyles";

function RatingInput(props) {
	const { error, showError, MoviesStore } = props;
	const selectedRating = MoviesStore.reviewFormData.rating || 0;
	const [hoverRating, setHoverRating] = useState(0);

	function updateGlobalState(rating) {
		MoviesStore.updateReviewFormData("rating", rating);
	}

	return (
		<Styles.Root>
			<Styles.Label required>Rating</Styles.Label>
			<Styles.Stars>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => {
					return (
						<Styles.Star
							className="material-icons-round"
							selected={
								hoverRating >= rating ||
								selectedRating >= rating
							}
							onMouseEnter={() => setHoverRating(rating)}
							onMouseLeave={() => setHoverRating(0)}
							onClick={() => updateGlobalState(rating)}
						>
							star
						</Styles.Star>
					);
				})}
			</Styles.Stars>
			{error && showError && <Styles.Message>{error}</Styles.Message>}
		</Styles.Root>
	);
}

export default inject("MoviesStore")(observer(RatingInput));
