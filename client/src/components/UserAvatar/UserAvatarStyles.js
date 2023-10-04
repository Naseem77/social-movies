import styled from "styled-components";
import { Link } from "react-router-dom";

export const Root = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
`;

export const Avatar = styled(Link)`
	display: block;
	cursor: pointer;
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--element-background-color);
	box-shadow: var(--card-shadow);
	transition: var(--transition-time);

	& div {
		user-select: none;
	}

	${(props) =>
		props.active &&
		`
        background-color: var(--washed-primary-color);
        color: var(--primary-color);
    `}
`;

export const Info = styled.div`
	margin-left: var(--spacing-x1-5);

	& > p:last-child {
		margin-top: 0.5rem;
		font-weight: var(--font-weight-regular);
		font-size: 1.4rem;
		color: var(--secondary-text-color);
	}
`;

// just to use the `as` prop
export const NameLink = styled(Link)``;
