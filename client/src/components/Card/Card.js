import styled from "styled-components";

const Card = styled.div`
	padding: var(--spacing-x2);
	border-radius: var(--border-radius);
	box-shadow: var(--card-shadow);
	background-color: var(--card-background-color);

	${(props) =>
		props.expand &&
		`
        width: 100%;
    `}
`;

export default Card;
