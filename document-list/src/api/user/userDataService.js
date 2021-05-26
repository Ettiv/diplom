import axios from 'axios';

import {
    JPA_API_URL
} from '../../constants/constants.js';

class UserDataService {

    retriveAllUsers() {
        return axios.get(`${JPA_API_URL}/employees`);
    }

    retriveAllReadyUsers(){
        return axios.get(`${JPA_API_URL}/employees?projection=EmployeeFull`);
    }

    retriveAllUnits(){
        return axios.get(`${JPA_API_URL}/units`);
    }

    retriveAllPosts(){
        return axios.get(`${JPA_API_URL}/posts`);
    }

    deleteUser(id) {
        return axios.delete(`${JPA_API_URL}/employees/${id}`);
    }

    retriveUser(id) {
        return axios.get(`${JPA_API_URL}/employees/${id}`);
    }

    retriveReadyUser(id) {
        return axios.get(`${JPA_API_URL}/users/${id}/?projection=EmployeeFull`);
    }

    updateUser(id, user) {
        return axios.put(`${JPA_API_URL}/employees/${id}`, user);
    }

    createUser(user) {
        return axios.post(`${JPA_API_URL}/employees`, user);
    }

}


export default new UserDataService();