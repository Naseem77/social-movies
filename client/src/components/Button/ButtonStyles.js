import styled from "styled-components";

const StyledButton = styled.button`
	cursor: pointer;
	display: block;
	padding: 1.5rem 3rem;
	border: none;
	background-color: var(--primary-color);
	color: var(--text-color);
	box-shadow: var(--card-shadow);
	text-align: center;
	${(props) => props.expand && "width: 100%;"}
	border-radius: var(--border-radius);

	${(props) =>
		props.secondary &&
		`
        background-color: var(--element-background-color);
    `}

	${(props) =>
		props.negative &&
		`
        background-color: var(--negative-color);
    `}
`;

export default StyledButton;
