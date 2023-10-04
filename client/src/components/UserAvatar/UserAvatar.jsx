import * as Styles from "./UserAvatarStyles";

function UserAvatar(props) {
	const { firstName, lastName, email, id } = props.user;
	const { date, showInfo, active, disableLink, ...rest } = props;
	return (
		<Styles.Root {...rest}>
			<Styles.Avatar
				to={`/user/${id}`}
				as={disableLink ? "span" : undefined}
				active={active}
			>
				<div className="h3">{firstName[0].toUpperCase()}</div>
			</Styles.Avatar>
			{showInfo && (
				<Styles.Info>
					<Styles.NameLink
						to={`/user/${id}`}
						as={disableLink ? "span" : undefined}
						className="p-small bold"
					>
						{firstName} {lastName}
					</Styles.NameLink>
					<p>{date ?? email}</p>
				</Styles.Info>
			)}
		</Styles.Root>
	);
}

export default UserAvatar;
