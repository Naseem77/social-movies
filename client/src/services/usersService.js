import axios from "axios";

class UsersService {
	static searchUser(query) {
		return axios.get(`/api/users/search?query=${query}`);
	}
	static userProfile(id) {
		return axios.get(`/api/users/user/${id}`);
	}
	static getUserRelationships(id) {
		return axios.get(`/api/users/relationships/${id}`);
	}
	static followUser(id) {
		return axios.post(`/api/users/following/${id}`);
	}
	static unFollowUser(id) {
		return axios.delete(`/api/users/following/${id}`);
	}
}

export default UsersService;
