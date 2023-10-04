class FormatUtils {
	static capitalizeWord(word) {
		return word[0].toUpperCase() + word.substring(1);
	}

	static getInputError(fieldApiName, errors) {
		if (typeof errors === "string") {
			return errors;
		}
		if (!Array.isArray(errors)) return;
		const inputError = errors.find((error) => error.field === fieldApiName);
		return inputError?.message;
	}
}

export default FormatUtils;
