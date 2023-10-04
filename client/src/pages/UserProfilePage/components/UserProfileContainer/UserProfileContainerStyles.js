import styled from "styled-components";
import Card from "../../../../components/Card";
import Loading from "../../../../components/Loading";

export const UserProfileContainer = styled(Card)`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	& button,
	& ${Loading} {
		margin-bottom: var(--spacing-x2);
	}
`;

export const Avatar = styled.div`
	display: block;
	width: 10rem;
	height: 10rem;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--element-background-color);
	box-shadow: var(--card-shadow);
	transition: var(--transition-time);
	font-size: 4.8rem;
	margin-bottom: var(--spacing-x1);
`;

export const UserEmail = styled.div`
	color: var(--secondary-text-color);
	margin-bottom: var(--spacing-x3);
`;
export const UserName = styled.h1`
	margin-bottom: 0.5rem;
`;

export const ConnectionsContainer = styled.div`
	display: flex;
	align-items: stretch;
	justify-content: center;
`;

export const Connection = styled.div`
	cursor: pointer;
	text-align: center;

	& div:first-child {
		margin-bottom: 1rem;
	}
	& div:last-child {
		transition: var(--transition-time);
		color: var(--secondary-text-color);
	}

	&:hover div:last-child {
		color: var(--primary-color);
	}
`;

export const Divider = styled.div`
	display: block;
	width: 1px;
	background-color: var(--element-background-color);
	border-radius: 100px;
	margin: 0 var(--spacing-x4);
`;
