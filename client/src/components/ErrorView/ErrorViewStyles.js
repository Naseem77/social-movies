import styled from "styled-components";

import Card from "../Card";

export const Root = styled(Card)`
	min-width: 200px;
	text-align: center;
	color: var(--text-color);

	& img {
		max-width: 8rem;
		margin-bottom: var(--spacing-x1);
	}
`;
