import styled from "styled-components";

import Card from "../../components/Card";

export const Root = styled(Card)`
	max-width: 500px;
	width: 100%;

	& h1 {
		margin-top: var(--spacing-x2);
		margin-bottom: calc(var(--spacing-x2) * 2) !important;
		text-align: center;
	}

	& > *:not(:last-child) {
		margin-bottom: var(--spacing-x2);
	}
`;

export const SwitchFormType = styled.p`
	text-align: center;

	& span {
		cursor: pointer;
		color: var(--primary-color);
		padding: 0.5rem;
		transition: var(--transition-time);
		border-radius: 3px;
	}

	& span:hover {
		background-color: var(--element-background-color);
	}
`;
