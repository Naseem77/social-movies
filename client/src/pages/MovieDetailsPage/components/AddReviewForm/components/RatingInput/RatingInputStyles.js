import styled from "styled-components";

import OriginalMessage from "../../../../../../components/Message";

export const Root = styled.div``;

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

export const Stars = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(2.8rem, 1fr));
	gap: var(--spacing-x1);
	grid-auto-rows: 3rem;
	justify-content: flex-start;
	align-items: flex-start;
`;

export const Star = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 3.4rem;
	color: var(--element-background-color);
	transition: var(--transition-time);

	${(props) =>
		props.selected &&
		`
        color: var(--primary-color);
    `}
`;

export const Message = styled(OriginalMessage)`
	margin-top: var(--spacing-x1);
`;
