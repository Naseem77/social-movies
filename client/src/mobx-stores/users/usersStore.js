import { makeObservable, action, observable } from "mobx";

import BaseStore from "../baseStore";
import UsersService from "../../services/usersService";
import authRequest from "../../utils/authRequest";

class UsersStore extends BaseStore {
	activeUserFollowingList = null;
	activeUserFollowersList = null;

	constructor() {
		super();

		makeObservable(this, {
			activeUserFollowingList: observable,
			activeUserFollowersList: observable,
			searchUser: action,
			getUserProfile: action,
			getUserRelationships: action,
			followUser: action,
			unFollowUser: action,
			clearSelectedUser: action,
		});
	}

	async searchUser(query) {
		try {
			this.setLoading();
			const response = await authRequest(() =>
				UsersService.searchUser(query)
			);
			this.setData({ searchResults: response.data.data });
		} catch (e) {
			this.setError(e.response.data?.errors);
		}
	}

	async getUserProfile(userId) {
		try {
			this.setLoading();
			const response = await authRequest(() =>
				UsersService.userProfile(userId)
			);
			this.setData({ selectedUser: response.data.data });
		} catch (e) {
			this.setError(e.response.data?.errors);
		}
	}

	clearSelectedUser() {
		this.success = false;
		this.errors = null;
		if (this.data?.selectedUser) {
			this.data.selectedUser = null;
		}
	}

	async getUserRelationships(userId) {
		try {
			const response = await authRequest(() =>
				UsersService.getUserRelationships(userId)
			);
			this.activeUserFollowingList = response.data.data.followingList;
			this.activeUserFollowersList = response.data.data.followersList;
		} catch (e) {
			this.setActionError(e.response.data?.errors);
		}
	}

	async followUser(activeUserId, userToFollow) {
		try {
			this.setActionLoading();
			await authRequest(() => UsersService.followUser(userToFollow));
			await this.getUserRelationships(activeUserId);

			if (this.data?.selectedUser) {
				const response = await authRequest(() =>
					UsersService.userProfile(this.data.selectedUser.id)
				);
				this.setData({ selectedUser: response.data.data });
			}
			this.setActionData();
		} catch (e) {
			this.setActionError(e.response.data?.errors);
		}
	}

	async unFollowUser(activeUserId, userToUnFollow) {
		try {
			this.setActionLoading();
			await authRequest(() => UsersService.unFollowUser(userToUnFollow));
			await this.getUserRelationships(activeUserId);
			if (this.data?.selectedUser) {
				const response = await authRequest(() =>
					UsersService.userProfile(this.data.selectedUser.id)
				);
				this.setData({ selectedUser: response.data.data });
			}
			this.setActionData();
		} catch (e) {
			this.setActionError(e.response.data?.errors);
		}
	}
}

const usersStore = new UsersStore();
export default usersStore;
