import styled from "styled-components";
import { Link } from "react-router-dom";

export const Root = styled.div`
	display: flex;
	flex-direction: start;
	& a {
		display: block;
	}
`;

export const Poster = styled(Link)`
	cursor: pointer;
	display: block;
	flex-shrink: 0;
	height: 120px;
	width: 80px;
	margin-right: var(--spacing-x2);
	background-color: var(--element-background-color);
	background-image: url("${(props) => props.src}");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	border-radius: var(--border-radius);
	box-shadow: var(--card-shadow);
`;

export const Info = styled.div`
	& > *:not(:last-child) {
		margin-bottom: var(--spacing-x1);
	}
`;
