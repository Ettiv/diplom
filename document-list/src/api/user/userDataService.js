import axios from 'axios';

import {
    JPA_API_URL
} from '../../constants/constants.js';

class UserDataService {

    retriveAllUsers() {
        return axios.get(`${JPA_API_URL}/users`);
    }

    retriveAllUnits(){
        return axios.get(`${JPA_API_URL}/units`);
    }

    retriveAllPosts(){
        return axios.get(`${JPA_API_URL}/posts`);
    }

    deleteUser(id) {
        return axios.delete(`${JPA_API_URL}/users/${id}`);
    }

    retriveUser(id) {
        return axios.get(`${JPA_API_URL}/users/${id}`);
    }

    updateUser(id, user) {
        return axios.put(`${JPA_API_URL}/users/${id}`, user);
    }

    createUser(user) {
        return axios.post(`${JPA_API_URL}/users`, user);
    }

}


export default new UserDataService();