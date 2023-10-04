import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "mobx-react";

import App from "./App";
import GlobalStyles from "./GlobalStyles";
import AuthStore from "./mobx-stores/auth/authStore";
import MoviesStore from "./mobx-stores/movies/moviesStore";
import UIStore from "./mobx-stores/ui/uiStore";
import UsersStore from "./mobx-stores/users/usersStore";

const stores = {
	AuthStore,
	MoviesStore,
	UIStore,
	UsersStore,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider {...stores}>
			<GlobalStyles />
			<App />
		</Provider>
	</React.StrictMode>
);
