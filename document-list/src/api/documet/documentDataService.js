import axios from 'axios';

import {
    JPA_API_URL
} from '../../constants/constants.js';

class DocumentDataService {

    retriveAllDocuments() {
        return axios.get(`${JPA_API_URL}/documents`);
    }

    retriveAllUsers() {
        return axios.get(`${JPA_API_URL}/users`);
    }

    retriveAllVids() {
        return axios.get(`${JPA_API_URL}/doc_vids`);
    }

    retriveAllTypes() {
        return axios.get(`${JPA_API_URL}/doc_types`);
    }

    retriveTypeById(id){
        return axios.get(`${JPA_API_URL}/doc_types/${id}`);
    }

    retriveAllOrganisations() {
        return axios.get(`${JPA_API_URL}/organisations`);
    }

    deleteTodo(id) {
        return axios.delete(`${JPA_API_URL}/documents/${id}`);
    }

    retriveDocument(id) {
        return axios.get(`${JPA_API_URL}/documents/${id}`);
    }

    updateDocument(id, todo) {
        return axios.put(`${JPA_API_URL}/documents/${id}`, todo);
    }

    createDocument(todo) {
        return axios.post(`${JPA_API_URL}/documents`, todo);
    }

}


export default new DocumentDataService();