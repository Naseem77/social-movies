import styled from "styled-components";

import Card from "../Card";
import Divider from "../Divider";

export const Root = styled(Card)`
	& h1 {
		margin-bottom: var(--spacing-x2);
	}

	& ${Divider} {
		margin-top: var(--spacing-x1-5);
		margin-bottom: var(--spacing-x2);
	}
`;
