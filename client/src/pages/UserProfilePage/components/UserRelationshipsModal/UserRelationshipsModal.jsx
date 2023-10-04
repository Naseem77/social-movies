import * as Styles from "./UserRelationshipsModalStyles";
import UserBox from "../../../../components/UserBox";
import { useState } from "react";
import { inject, observer } from "mobx-react";
import Divider from "../../../../components/Divider";

function UserRelationshipsModal(props) {
	const { UsersStore, followersList, followingList } = props;
	const [selectedTab, setSelectedTab] = useState(props.initialTab);

	return (
		<Styles.Root>
			<Styles.Header>
				<Styles.Connentions
					expand
					state={selectedTab === "Following"}
					onClick={() => setSelectedTab("Following")}
				>
					Following
				</Styles.Connentions>
				<Styles.Connentions
					expand
					state={selectedTab === "Followers"}
					onClick={() => setSelectedTab("Followers")}
				>
					Followers
				</Styles.Connentions>
			</Styles.Header>

			<Styles.Body>
				{selectedTab === "Following" &&
					followingList.map((user, index) => (
						<div key={user.id}>
							{<UserBox user={user} />}
							{followingList.length - index > 1 && <Divider />}
						</div>
					))}
				{selectedTab === "Followers" &&
					followersList.map((user, index) => (
						<div key={user.id}>
							{<UserBox user={user} />}
							{followersList.length - index > 1 && <Divider />}
						</div>
					))}
			</Styles.Body>
		</Styles.Root>
	);
}

export default inject("UsersStore")(observer(UserRelationshipsModal));
