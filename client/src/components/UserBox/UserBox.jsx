import * as Styles from "./UserBoxStyles";
import UserAvatar from "../UserAvatar";
import { inject, observer } from "mobx-react";
import { useState } from "react";
import Button from "../Button";
import Loading from "../Loading";

function UserBox(props) {
	const { UIStore, UsersStore, AuthStore, user } = props;
	const followingList = UsersStore.activeUserFollowingList;
	const activeUserId = AuthStore.data?.activeUser?.id;
	const isFollowing = checkIsFollowing();
	const [loading, setLoading] = useState(false);

	function checkIsFollowing() {
		if (!followingList) {
			return false;
		}
		return followingList.some(
			(followingUser) => followingUser.id === user.id
		);
	}

	async function unFollowUser() {
		setLoading(true);
		await UsersStore.unFollowUser(activeUserId, user.id);
		setLoading(false);
	}
	async function followUser() {
		setLoading(true);
		await UsersStore.followUser(activeUserId, user.id);
		setLoading(false);
	}

	function closeModal() {
		UIStore.closeModal();
	}

	if (user.id === activeUserId) {
		return (
			<Styles.Root>
				<UserAvatar user={user} showInfo onClick={closeModal} />
			</Styles.Root>
		);
	}

	return (
		<Styles.Root>
			<UserAvatar user={user} showInfo onClick={closeModal} />
			{loading && <Loading small />}

			{!loading && !isFollowing && (
				<Button onClick={followUser}>Follow</Button>
			)}
			{!loading && isFollowing && (
				<Button onClick={unFollowUser} secondary>
					Following
				</Button>
			)}
		</Styles.Root>
	);
}

export default inject("UIStore", "UsersStore", "AuthStore")(observer(UserBox));
