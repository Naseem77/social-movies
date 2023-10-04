import { makeObservable, action } from "mobx";

import BaseStore from "../baseStore";
import AuthService from "../../services/authService";
import authRequest from "../../utils/authRequest";

class AuthStore extends BaseStore {
	constructor() {
		super();

		makeObservable(this, {
			register: action,
			login: action,
			logout: action,
			getUserData: action,
		});
	}

	async register(userData) {
		try {
			this.setLoading();
			const response = await AuthService.register(userData);
			this.setData({ activeUser: response.data.data.user });
		} catch (e) {
			this.setError(e.response.data?.errors);
		}
	}

	async login(userData) {
		try {
			this.setLoading();
			const response = await AuthService.login(userData);
			this.setData({ activeUser: response.data.data.user });
		} catch (e) {
			this.setError(e.response.data?.errors);
		}
	}

	async logout() {
		try {
			this.setLoading();
			await authRequest(() => AuthService.logout());
			this.setData({ activeUser: null });
		} catch (e) {
			this.setError();
		}
	}

	async getUserData() {
		try {
			this.setLoading();
			const response = await authRequest(() => AuthService.getUserData());
			this.setData({ activeUser: response.data?.data });
		} catch (e) {
			this.setData(null);
		}
	}
}

const authStore = new AuthStore();
export default authStore;
