import { inject, observer } from "mobx-react";
import { Navigate } from "react-router-dom";
import Container from "./components/Container/Container";
import Loading from "./components/Loading/Loading";

function ProtectedRoute(props) {
	const { inAuth, element } = props;
	const { AuthStore } = props;
	const { loading, data, success, errors } = AuthStore;
	const activeUser = data?.activeUser;

	if (loading && inAuth) {
		return element;
	}

	if (loading) {
		return (
			<Container expand centerHorizontally centerVertically>
				<Loading />
			</Container>
		);
	}

	if (inAuth) {
		if (activeUser) return <Navigate to="/" replace />;
		return element;
	}

	if (!activeUser) return <Navigate to="/login" replace />;
	return element;
}

export default inject("AuthStore")(observer(ProtectedRoute));
