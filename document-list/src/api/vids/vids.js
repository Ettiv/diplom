import axios from 'axios';

import {
    JPA_API_URL
} from '../../constants/constants.js';

class VidsDataService {

    retriveAllVids() {
        return axios.get(`${JPA_API_URL}/vids`);
    }

    deleteVid(id) {
        return axios.delete(`${JPA_API_URL}/vids/${id}`);
    }

    retriveVid(id) {
        return axios.get(`${JPA_API_URL}/vids/${id}`);
    }

    updateVid(id, vid) {
        return axios.put(`${JPA_API_URL}/vids/${id}`, vid);
    }

    createVid(vid) {
        return axios.post(`${JPA_API_URL}/vids`, vid);
    }

}


export default new VidsDataService();