import StyledMessage from "./MessageStyles";

function Message(props) {
	return <StyledMessage {...props}>{props.children}</StyledMessage>;
}

export default Message;
