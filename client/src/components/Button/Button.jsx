import StyledButton from "./ButtonStyles";

function Button(props) {
	return (
		<StyledButton className="clickable p-small bold" {...props}>
			{props.children}
		</StyledButton>
	);
}

export default Button;
