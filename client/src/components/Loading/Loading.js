import styled from "styled-components";

const Loading = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	animation: fade-in 800ms;

	&::after {
		content: "";
		display: block;
		width: ${(props) =>
			props.small ? "32px" : props.med ? "40px" : "48px"};
		height: ${(props) =>
			props.small ? "32px" : props.med ? "40px" : "48px"};
		border-radius: 50%;
		border: ${(props) => (props.small ? "4px" : props.med ? "5px" : "6px")}
			solid #fff;
		border-color: var(--primary-color) transparent var(--primary-color)
			transparent;
		animation: lds-dual-ring 700ms linear infinite;
	}

	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

export default Loading;
