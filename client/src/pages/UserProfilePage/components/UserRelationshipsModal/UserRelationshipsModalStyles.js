import styled from "styled-components";
import Button from "../../../../components/Button";
import Divider from "../../../../components/Divider";

export const Root = styled.div``;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 2rem;
`;

export const Connentions = styled(Button)`
	background-color: var(--card-background-color);
	border-bottom: 2px solid var(--element-background-color);
	border-radius: 0;
	box-shadow: none;
	font-size: 1.6rem;
	font-weight: var(--font-weight-medium);

	${(props) =>
		props.state &&
		`
			color: var(--primary-color);
			border-bottom: 2px solid var(--primary-color);
		`}
`;

export const Body = styled.div`
	& h1 {
		margin-bottom: var(--spacing-x2);
	}

	& ${Divider} {
		margin-top: var(--spacing-x1-5);
		margin-bottom: var(--spacing-x2);
	}
`;
