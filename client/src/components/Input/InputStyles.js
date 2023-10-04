import styled from "styled-components";

import OriginalMessage from "../Message";

export const Root = styled.div`
	width: 100%;
`;

export const Label = styled.label`
	display: block;
	margin-bottom: var(--spacing-x1);

	${(props) =>
		props.required &&
		`
        &::after {
            content: '*';
            color: var(--negative-color);
        }
   `}
`;

export const Message = styled(OriginalMessage)`
	margin-top: 0.5rem;
`;

export const Input = styled.input`
	width: 100%;
	padding: 1.5rem;
	color: var(--text-color);
	background-color: var(--element-background-color);
	border-radius: var(--border-radius);
	transition: var(--transition-time);
	box-shadow: var(--card-shadow);
	border: none;
`;
