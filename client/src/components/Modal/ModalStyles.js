import styled from "styled-components";

import Card from "../Card";

export const Root = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(26, 26, 26, 0.8);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999999999;
	opacity: 0;
	pointer-events: none;
	transition: var(--transition-time) ease;

	${(props) =>
		props.active &&
		`
        opacity: 1;
        pointer-events: all;
    `}
`;

export const Modal = styled(Card)`
	max-width: 500px;
	width: 100%;
	transition: var(--transition-time) ease;
	transform: translateY(-50px);
	opacity: 0;

	& > *:not(:last-child) {
		margin-bottom: var(--spacing-x2);
	}

	${(props) =>
		props.active &&
		`
        transform: translateY(0);
        opacity: 1;
    `}
`;

export const ModalHeader = styled.div`
	display: flex;
	justify-content: end;
	align-items: flex-start;
`;

export const CloseBtn = styled.div`
	cursor: pointer;
	height: 4rem;
	width: 4rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--element-background-color);
	border-radius: 50%;

	& > span {
		color: var(--text-color);
		font-size: 2rem;
	}
`;

export const ModalBody = styled.div`
	max-height: 500px;
	overflow-y: auto;
	overflow-x: hidden;

	& > *:not(:last-child) {
		margin-bottom: var(--spacing-x2);
	}

	&:hover::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar {
		width: 0px;
	}

	::-webkit-scrollbar-track {
		background: var(--element-background-color);
		border-radius: 5px;
	}

	::-webkit-scrollbar-thumb {
		background: var(--secondary-text-color);
		border-radius: 5px;
		box-shadow: var(--card-shadow);
	}

	::-webkit-scrollbar-thumb:hover {
		background: var(--text-color);
	}
`;

export const ModalFooter = styled.div`
	display: flex;
	justify-content: end;
	align-items: center;

	& > *:not(:last-child) {
		margin-right: var(--spacing-x2);
	}
`;
