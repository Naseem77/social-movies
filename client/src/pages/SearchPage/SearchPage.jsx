import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { inject, observer } from "mobx-react";

import * as Styles from "./SearchPageStyles";
import Loading from "../../components/Loading";
import DividedList from "../../components/DividedList";
import MovieCard from "../../components/MovieCard";
import ErrorView from "../../components/ErrorView/ErrorView";
import UserBox from "../../components/UserBox";

function SearchPage(props) {
	const { MoviesStore, UsersStore } = props;
	const params = new URLSearchParams(useLocation().search);
	const query = params.get("query");

	useEffect(() => {
		UsersStore.searchUser(query);
		MoviesStore.searchMovie(query);
	}, [query]);

	function IsSuccess() {
		return (
			MoviesStore.data?.searchResults && UsersStore.data?.searchResults
		);
	}

	function isError() {
		return MoviesStore.errors || UsersStore.errors;
	}

	function isLoading() {
		return MoviesStore.loading || UsersStore.loading;
	}

	return (
		<Styles.Root
			expand
			centerVertically={isError() || isLoading()}
			centerHorizontally={isError() || isLoading()}
		>
			{isLoading() && <Loading />}
			{isError() && <ErrorView />}
			{IsSuccess() && (
				<>
					<DividedList
						resultsList={UsersStore.data.searchResults}
						title="Users"
						buildComponent={(user) => <UserBox user={user} />}
					/>

					<DividedList
						resultsList={MoviesStore.data.searchResults}
						title="Movies"
						buildComponent={(movie) => <MovieCard movie={movie} />}
					/>
				</>
			)}
		</Styles.Root>
	);
}

export default inject("MoviesStore", "UsersStore")(observer(SearchPage));
