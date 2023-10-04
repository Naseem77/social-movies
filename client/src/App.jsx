import { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Modal from "./components/Modal/Modal";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import AuthPage from "./pages/AuthPage";
import UserProfilePage from "./pages/UserProfilePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";

function App(props) {
	const { AuthStore, UsersStore } = props;
	const activeUser = AuthStore.data?.activeUser;

	useEffect(() => {
		AuthStore.getUserData();
	}, []);

	useEffect(() => {
		if (activeUser) {
			UsersStore.getUserRelationships(activeUser.id);
		}
	}, [activeUser]);

	return (
		<Router>
			<Modal />
			<Header />
			<Routes>
				<Route
					path="/register"
					element={
						<ProtectedRoute
							inAuth
							element={<AuthPage formType="Register" />}
						/>
					}
				/>
				<Route
					path="/login"
					element={
						<ProtectedRoute
							inAuth
							element={<AuthPage formType="Login" />}
						/>
					}
				/>
				<Route
					path="/"
					element={<ProtectedRoute element={<HomePage />} />}
				/>
				<Route
					path="/user/:userId"
					element={<ProtectedRoute element={<UserProfilePage />} />}
				/>
				<Route
					path="/movie/:movieId"
					element={<ProtectedRoute element={<MovieDetailsPage />} />}
				/>
				<Route
					path="/search"
					element={<ProtectedRoute element={<SearchPage />} />}
				/>
			</Routes>
			<Footer />
		</Router>
	);
}

export default inject("AuthStore", "UsersStore")(observer(App));
