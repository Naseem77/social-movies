import { useState } from "react";
import { inject, observer } from "mobx-react";

import * as Styles from "./AuthPageStyles";
import useInputController from "../../hooks/useInputController";
import FormatUtils from "../../utils/formatUtils";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loading from "../../components/Loading";

function AuthPage(props) {
	const [formType, setFormType] = useState(props.formType ?? "Login");
	const [showErrors, setShowErrors] = useState(false);
	const firstNameController = useInputController("");
	const lastNameController = useInputController("");
	const emailController = useInputController("");
	const passwordController = useInputController("");
	const { AuthStore } = props;
	const { errors, loading } = AuthStore;

	function toggleFormType() {
		setShowErrors(false);
		setFormType((prev) => {
			if (prev === "Login") {
				return "Register";
			}
			return "Login";
		});
	}

	function submit(e) {
		e.preventDefault();
		const userData = {
			firstName: firstNameController.value,
			lastName: lastNameController.value,
			email: emailController.value,
			password: passwordController.value,
		};
		setShowErrors(false);
		if (formType === "Login") {
			AuthStore.login(userData);
		} else {
			AuthStore.register(userData);
		}
		setShowErrors(true);
	}

	function getInputError(fieldApiName) {
		if (!showErrors) return;
		return FormatUtils.getInputError(fieldApiName, errors);
	}

	return (
		<Container expand centerHorizontally>
			<Styles.Root as="form" noValidate onSubmit={submit}>
				<h1>{formType}</h1>
				{formType === "Register" && (
					<>
						<Input
							{...firstNameController}
							label="First name"
							type="text"
							required
							showError={getInputError("firstName")}
							error={getInputError("firstName")}
						/>
						<Input
							{...lastNameController}
							label="last Name"
							type="text"
							required
							showError={getInputError("lastName")}
							error={getInputError("lastName")}
						/>
					</>
				)}
				<Input
					{...emailController}
					label="Email"
					type="email"
					required
					showError={getInputError("email")}
					error={getInputError("email")}
				/>
				<Input
					{...passwordController}
					label="Passowrd"
					type="password"
					required
					showError={getInputError("password")}
					error={getInputError("password")}
				/>
				{AuthStore.loading ? (
					<Loading med />
				) : (
					<>
						<Button expand>{formType}</Button>
						{formType === "Login" ? (
							<Styles.SwitchFormType className="p-small">
								don't have an accout yet?
								<span onClick={toggleFormType}>Register</span>
							</Styles.SwitchFormType>
						) : (
							<Styles.SwitchFormType className="p-small">
								Already have an account?
								<span onClick={toggleFormType}>Login</span>
							</Styles.SwitchFormType>
						)}
					</>
				)}
			</Styles.Root>
		</Container>
	);
}

export default inject("AuthStore")(observer(AuthPage));
