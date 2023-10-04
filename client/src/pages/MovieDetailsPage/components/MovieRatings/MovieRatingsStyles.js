import styled from "styled-components";

export const Root = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;

	& > *:not(:last-child) {
		margin-right: var(--spacing-x2);
	}
`;
