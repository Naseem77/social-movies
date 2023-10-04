import styled from "styled-components";

import Container from "../../components/Container";

export const Root = styled(Container)`
	& > *:not(:last-child) {
		margin-bottom: var(--spacing-x4);
	}
`;
