import styled from "styled-components";

const MovieRatingContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;

	& > *:first-child {
		margin-right: var(--spacing-x1);
	}

	& img {
		height: 15px;
		${(props) =>
			props.big &&
			`
			height: 20px;
		`}
	}

	& span {
		color: var(--primary-color);
		font-size: 2.2rem;
		${(props) =>
			props.big &&
			`
			font-size: 2.6rem;
		`}
	}
`;

export default MovieRatingContainer;
