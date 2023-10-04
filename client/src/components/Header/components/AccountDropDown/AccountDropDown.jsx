import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";

import * as Styles from "./AccountDropDownStyles";
import Button from "../../../Button/Button";
import UserAvatar from "../../../UserAvatar";

function AccountDropDown(props) {
	const [active, setActive] = useState(false);
	const { AuthStore } = props;
	const activeUser = AuthStore.data.activeUser;

	function toggleState() {
		setActive((prev) => !prev);
	}

	function logout() {
		AuthStore.logout();
	}

	return (
		<Styles.Root>
			<UserAvatar
				onClick={toggleState}
				active={active}
				user={activeUser}
				disableLink
			/>

			<Styles.Menu active={active}>
				<UserAvatar user={activeUser} showInfo disableLink />

				<Link to={`/user/${activeUser.id}`}>
					<Button expand>My Profile</Button>
				</Link>
				<Button secondary expand onClick={logout}>
					Logout
				</Button>
			</Styles.Menu>
		</Styles.Root>
	);
}

export default inject("AuthStore")(observer(AccountDropDown));
