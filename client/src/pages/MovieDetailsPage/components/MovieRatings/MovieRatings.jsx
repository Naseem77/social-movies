import * as Styles from "./MovieRatingsStyles";
import IMDBLogo from "../../../../assets/imdb-logo.svg";
import MovieRatingContainer from "../../../../components/MovieRatingContainer";

function MovieRatings(props) {
	const { IMDBRating, appRating, activeUserRating } = props;

	return (
		<Styles.Root>
			{IMDBRating != undefined && (
				<MovieRatingContainer big>
					<img src={IMDBLogo} />
					<p className="p-large bold">{IMDBRating}/10</p>
				</MovieRatingContainer>
			)}
			{appRating != undefined && (
				<MovieRatingContainer big>
					<span className="material-icons-round">star</span>
					<p className="p-large bold">{appRating}/10</p>
				</MovieRatingContainer>
			)}
			{activeUserRating != undefined && (
				<MovieRatingContainer big>
					<span className="material-icons-round">person</span>
					<p className="p-large bold">{activeUserRating}/10</p>
				</MovieRatingContainer>
			)}
		</Styles.Root>
	);
}

export default MovieRatings;
