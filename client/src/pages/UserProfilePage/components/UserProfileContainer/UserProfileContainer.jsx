import * as Styles from "./UserProfileContainerStyles";
import FormatUtils from "../../../../utils/formatUtils";
import UserRelationshipsModal from "../UserRelationshipsModal";
import { observer, inject } from "mobx-react";
import Button from "../../../../components/Button";
import Loading from "../../../../components/Loading";

function UserProfileContainer(props) {
	const { userDetails, UIStore, AuthStore, UsersStore } = props;
	const firstName = FormatUtils.capitalizeWord(userDetails.firstName);
	const lastName = FormatUtils.capitalizeWord(userDetails.lastName);
	const followersCount = userDetails.followersList.length;
	const followingCount = userDetails.followingList.length;
	const activeUser = AuthStore.data?.activeUser;
	const activeUserFollowingList = UsersStore.activeUserFollowingList;
	const isFollowing = checkIsFollowing();

	function openModal(initialTab) {
		UIStore.openModal({
			body: (
				<UserRelationshipsModal
					initialTab={initialTab}
					followersList={userDetails.followersList}
					followingList={userDetails.followingList}
				/>
			),
		});
	}
	function checkIsFollowing() {
		if (!activeUserFollowingList) {
			return false;
		}
		return activeUserFollowingList.some(
			(user) => user.id === userDetails.id
		);
	}

	function unFollowUser() {
		UsersStore.unFollowUser(activeUser.id, userDetails.id);
	}
	function followUser() {
		UsersStore.followUser(activeUser.id, userDetails.id);
	}

	return (
		<Styles.UserProfileContainer expand>
			<Styles.Avatar>
				<div className="bold">
					{userDetails.firstName[0].toUpperCase()}
				</div>
			</Styles.Avatar>
			<Styles.UserName className="h3">
				{firstName + " " + lastName}
			</Styles.UserName>
			<Styles.UserEmail className="h6 regular">
				{userDetails.email}
			</Styles.UserEmail>
			{activeUser.id !== userDetails.id &&
				(UsersStore.actionLoading ? (
					<Loading med />
				) : isFollowing ? (
					<Button secondary onClick={unFollowUser}>
						Following
					</Button>
				) : (
					<Button onClick={followUser}>Follow</Button>
				))}

			<Styles.ConnectionsContainer>
				<Styles.Connection onClick={() => openModal("Following")}>
					<div className="h4">{followingCount}</div>
					<div className="p-small">Following</div>
				</Styles.Connection>
				<Styles.Divider />
				<Styles.Connection onClick={() => openModal("Followers")}>
					<div className="h4">{followersCount}</div>
					<div className="p-small">Followers</div>
				</Styles.Connection>
			</Styles.ConnectionsContainer>
		</Styles.UserProfileContainer>
	);
}

export default inject(
	"UIStore",
	"AuthStore",
	"UsersStore"
)(observer(UserProfileContainer));
