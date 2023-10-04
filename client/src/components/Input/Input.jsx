import React from "react";

import * as Styles from "./InputStyles";

function Input(props) {
	const { label, required, multiLine, error, showError } = props;

	// if there's no label or errorMessage provided
	// return only input element, otherwise might do
	// some unnecessary problems
	if (!label) {
		return <Styles.Input className="p-small" {...props} />;
	}

	return (
		<Styles.Root>
			<Styles.Label required={required}>{label}</Styles.Label>
			<Styles.Input
				className="p-small"
				as={multiLine && "textarea"}
				{...props}
			/>
			{error && showError && <Styles.Message>{error}</Styles.Message>}
		</Styles.Root>
	);
}

export default Input;
