import styled from "styled-components";
import { Link } from "react-router-dom";

import Container from "../Container/Container";

export const Root = styled.header`
	position: sticky;
	top: 0;
	z-index: 9999;
	background-color: var(--card-background-color);
	margin-bottom: var(--spacing-x4);
	box-shadow: var(--card-shadow);
	transition: background-color var(--transition-time);

	${(props) =>
		props.transparent &&
		`
        background-color: transparent;
        box-shadow: none;
    `}
`;

export const Header = styled(Container)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--spacing-x2) 0;
`;

export const Logo = styled(Link)`
	cursor: pointer;
	display: block;
	user-select: none;
	color: var(--primary-color);
`;

export const RightSection = styled.div`
	display: flex;
	align-items: center;

	& > *:not(:last-child) {
		margin-right: var(--spacing-x2);
	}
`;
