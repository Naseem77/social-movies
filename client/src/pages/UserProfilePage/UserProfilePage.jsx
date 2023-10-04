import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useParams } from "react-router-dom";

import Container from "../../components/Container";
import * as Styles from "./UserProfilePageStyles";
import Loading from "../../components/Loading";
import ErrorView from "../../components/ErrorView/ErrorView";
import UserProfileContainer from "./components/UserProfileContainer";
import UserReviewsContainer from "./components/UserReviewsContainer";

function UserProfilePage(props) {
	const { UsersStore } = props;
	const { userId } = useParams();
	const { loading, errors, success, data } = UsersStore;

	const user = data?.selectedUser;
	const userReviews = data?.selectedUser?.reviews;

	useEffect(() => {
		UsersStore.getUserProfile(userId);

		return () => UsersStore.clearSelectedUser();
	}, [userId]);

	return (
		<Container
			expand
			centerHorizontally={errors || loading}
			centerVertically={errors || loading}
		>
			{loading && <Loading />}
			{errors && <ErrorView />}
			{user && (
				<>
					<UserProfileContainer userDetails={user} />
					<UserReviewsContainer userReviews={userReviews} />
				</>
			)}
		</Container>
	);
}

export default inject("UsersStore")(observer(UserProfilePage));
