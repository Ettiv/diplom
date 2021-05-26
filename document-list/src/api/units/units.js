import axios from 'axios';

import {
    JPA_API_URL
} from '../../constants/constants.js';

class UnitsDataService {

    retriveAllUnits() {
        return axios.get(`${JPA_API_URL}/units`);
    }

    deleteUnit(id) {
        return axios.delete(`${JPA_API_URL}/units/${id}`);
    }

    retriveUnit(id) {
        return axios.get(`${JPA_API_URL}/units/${id}`);
    }

    updateUnit(id, unit) {
        return axios.put(`${JPA_API_URL}/units/${id}`, unit);
    }

    createUnit(unit) {
        return axios.post(`${JPA_API_URL}/units`, unit);
    }

}


export default new UnitsDataService();