import React from "react";

import * as Styles from "./ErrorViewStyles";
import ErrorIcon from "../../assets/error.png";

function ErrorView({ errorMessage }) {
	return (
		<Styles.Root>
			<img src={ErrorIcon} alt="error" />
			<p className="p-large medium">{errorMessage}</p>
		</Styles.Root>
	);
}

export default ErrorView;
