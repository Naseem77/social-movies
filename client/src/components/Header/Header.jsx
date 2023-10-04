import { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import * as Styles from "./HeaderStyles";
import useInputController from "../../hooks/useInputController";
import AccountDropDown from "./components/AccountDropDown";
import Button from "../Button/Button";
import Input from "../Input";

function Header(props) {
	const { AuthStore, UIStore } = props;
	const activeUser = AuthStore.data?.activeUser;
	const searchController = useInputController("");
	const navigate = useNavigate();
	const [isScrolled, setIsScrolled] = useState(false);

	function search(e) {
		e.preventDefault();
		const query = searchController.value;
		if (!query) {
			return;
		}
		navigate(`/search?query=${query}`);
		searchController.onChange({ target: { value: "" } });
	}

	useEffect(() => {
		if (UIStore.transparentHeader) {
			function updateScroll() {
				const isScrolled = window.scrollY > 50;
				setIsScrolled(isScrolled);
			}
			document.addEventListener("scroll", updateScroll);

			return () => document.removeEventListener("scroll", updateScroll);
		}
	}, [isScrolled, UIStore.transparentHeader]);

	return (
		<Styles.Root transparent={UIStore.transparentHeader && !isScrolled}>
			<Styles.Header>
				<Styles.Logo className="h1" to="/">
					Social Movies
				</Styles.Logo>
				<Styles.RightSection>
					{activeUser ? (
						<>
							<form onSubmit={search} noValidate>
								<Input
									placeholder="Search"
									{...searchController}
								/>
							</form>
							<AccountDropDown />
						</>
					) : (
						<Link to="/login">
							<Button secondary>Login</Button>
						</Link>
					)}
				</Styles.RightSection>
			</Styles.Header>
		</Styles.Root>
	);
}

export default inject("AuthStore", "UIStore")(observer(Header));
