import styled from "styled-components";

import Card from "../Card";

export const Root = styled(Card)`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
`;

export const LeftSection = styled.div`
	margin-right: var(--spacing-x2);
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

export const RightSection = styled.div`
	flex-grow: 1;
	& > *:not(:last-child) {
		margin-bottom: var(--spacing-x2);
	}
`;

export const DeleteIcon = styled.span`
	cursor: pointer;
	color: var(--negative-color);
	font-size: 2.6rem;
`;
