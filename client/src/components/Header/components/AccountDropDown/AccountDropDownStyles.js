import styled from "styled-components";

import Card from "../../../Card";

export const Root = styled.div`
	position: relative;
`;

export const Menu = styled(Card)`
	position: absolute;
	padding: var(--spacing-x2);
	width: 300px;
	right: 0;
	top: calc(100% + var(--spacing-x1-5));
	transform-origin: top;
	transition: 300ms ease;
	transform: translateY(-20px);
	opacity: 0;
	pointer-events: none;

	${(props) =>
		props.active &&
		`
        transform: translateY(0);
        opacity: 1;
        pointer-events: all;

    `};

	& > a {
		display: block;
	}

	& > *:not(:last-child) {
		margin-bottom: var(--spacing-x2);
	}
`;
