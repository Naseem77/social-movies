import { inject, observer } from "mobx-react";

import { Link } from "react-router-dom";
import * as Styles from "./MovieCardStyles";
import IMDBLogo from "../../assets/imdb-logo.svg";
import MovieRatingContainer from "../MovieRatingContainer/MovieRatingContainer";

function MovieCard(props) {
	const { id, title, releaseDate, posterImageURL, IMDBRating } = props.movie;

	return (
		<Styles.Root>
			<Styles.Poster to={`/movie/${id}`} src={posterImageURL} />
			<Styles.Info>
				<Link to={`/movie/${id}`} className="p-small bold">
					{title}
				</Link>
				<p className="p-small bold">
					{new Date(releaseDate).getFullYear()}
				</p>
				<MovieRatingContainer>
					<img src={IMDBLogo} alt={"IMDBRating"} />
					<p className="p-small bold">{IMDBRating}/10</p>
				</MovieRatingContainer>
			</Styles.Info>
		</Styles.Root>
	);
}

export default inject("MoviesStore", "UsersStore")(observer(MovieCard));
