import AuthService from "../services/authService";

async function refreshToken() {
	try {
		await AuthService.refreshToken();
		return true;
	} catch (e) {
		return false;
	}
}

async function authRequest(request) {
	try {
		return await request();
	} catch (e) {
		if (e.response.status !== 401) {
			throw e;
		}
		const isRefreshTokenSuccess = await refreshToken();
		if (isRefreshTokenSuccess) {
			return await request();
		}
		throw e;
	}
}

export default authRequest;
