import styled from "styled-components";

const Container = styled.div`
	margin: 0 auto;
	max-width: 1100px;
	${(props) =>
		props.expand &&
		`
        flex-grow: 1;
        width: 100%;
    `}
	${(props) =>
		(props.centerHorizontally || props.centerVertically) &&
		`
        display: flex;
        flex-direction: column;
        justify-content: ${props.centerVertically ? "center" : "flex-start"};
        align-items: ${props.centerHorizontally ? "center" : "flex-start"};
    `}
`;

export default Container;
