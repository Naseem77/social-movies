import styled from "styled-components";

const StyledMessage = styled.p`
	${(props) =>
		props.big
			? "margin-bottom: var(--spacing-x1)"
			: "margin-top: var(--spacing-x1)"};
	font-size: 1.3rem;
	color: ${(props) =>
		props.positive ? "var(--positive-color)" : "var(--negative-color)"};
	animation: fadeInFromTop ease-in-out var(--transition-time);

	@keyframes fadeInFromTop {
		0% {
			opacity: 0.2;
			transform: translateY(-5px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;

export default StyledMessage;
