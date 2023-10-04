import { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";

import * as Styles from "./AddReviewFormStyles";
import Input from "../../../../components/Input";
import FormatUtils from "../../../../utils/formatUtils";
import RatingInput from "./components/RatingInput";

function AddReviewForm(props) {
	const { MoviesStore } = props;
	const { actionLoading, actionErrors, actionSuccess } = MoviesStore;

	useEffect(() => {
		return () => MoviesStore.clearReviewFormData();
	}, []);

	function inputOnChange(e) {
		const { name, value } = e.target;
		MoviesStore.updateReviewFormData(name, value);
	}

	function getInputValue(name) {
		return MoviesStore.reviewFormData[name] ?? "";
	}

	function getInputError(fieldApiName) {
		if (actionLoading) return;
		return FormatUtils.getInputError(fieldApiName, actionErrors);
	}

	return (
		<>
			<RatingInput
				name="rating"
				showError={getInputError("rating")}
				error={getInputError("rating")}
			/>
			<Input
				label="Feedback"
				name="feedback"
				multiLine
				onChange={inputOnChange}
				value={getInputValue("feedback")}
				required
				showError={getInputError("feedback")}
				error={getInputError("feedback")}
			/>
		</>
	);
}

export default inject("MoviesStore")(observer(AddReviewForm));
