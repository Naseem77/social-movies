import axios from "axios";

class AuthService {
	static register(userData) {
		return axios.post("/api/auth/register", userData);
	}
	static login(userData) {
		return axios.post("/api/auth/login", userData);
	}
	static refreshToken() {
		return axios.put("/api/auth/refreshToken");
	}
	static getUserData() {
		return axios.get("/api/auth/getUserData");
	}
	static logout() {
		return axios.delete("/api/auth/logout");
	}
}

export default AuthService;
