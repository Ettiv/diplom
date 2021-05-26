import axios from 'axios';

import {
    JPA_API_URL
} from '../../constants/constants.js';

class TypesDataService {

    retriveAllTypes() {
        return axios.get(`${JPA_API_URL}/types`);
    }

    deleteType(id) {
        return axios.delete(`${JPA_API_URL}/types/${id}`);
    }

    retriveType(id) {
        return axios.get(`${JPA_API_URL}/types/${id}`);
    }

    updateType(id, type) {
        return axios.put(`${JPA_API_URL}/types/${id}`, type);
    }

    createType(type) {
        return axios.post(`${JPA_API_URL}/types`, type);
    }

}


export default new TypesDataService();