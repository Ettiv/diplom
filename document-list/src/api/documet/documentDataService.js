import axios from 'axios';

import {
    JPA_API_URL
} from '../../constants/constants.js';

class DocumentDataService {

    retriveAllDocuments() {
        return axios.get(`${JPA_API_URL}/docs`);
    }

    retriveAllReadyDocuments(){
        return axios.get(`${JPA_API_URL}/docs?projection=docFull`);
    }

    retriveSearchDocuments(searchParametr){
        return axios.get(`${JPA_API_URL}/docs/search/findByName?name=${searchParametr}&projection=docFull`);
    }

    retriveAllUsers() {
        return axios.get(`${JPA_API_URL}/employees`);
    }

    retriveAllVids() {
        return axios.get(`${JPA_API_URL}/vids`);
    }

    retriveAllTypes() {
        return axios.get(`${JPA_API_URL}/types`);
    }

    retriveTypeById(id){
        axios.get(`${JPA_API_URL}/types/${id}`);
    }

    retriveVidById(id){
        axios.get(`${JPA_API_URL}/vids/${id}`);
    }

    retriveOrgById(id){
        axios.get(`${JPA_API_URL}/orgs/${id}`);
    }

    retriveEmployeeById(id){
        axios.get(`${JPA_API_URL}/employees/${id}`);
    }

    retriveAllOrganisations() {
        return axios.get(`${JPA_API_URL}/orgs`);
    }

    deleteTodo(id) {
        return axios.delete(`${JPA_API_URL}/docs/${id}`);
    }

    retriveDocument(id) {
        return axios.get(`${JPA_API_URL}/docs/${id}`);
    }

    retriveReadyDocument(id) {
        return axios.get(`${JPA_API_URL}/docs/${id}?projection=docFull`);
    }

    updateDocument(id, todo) {
        return axios.put(`${JPA_API_URL}/docs/${id}`, todo);
    }

    createDocument(todo) {
        return axios.post(`${JPA_API_URL}/docs`, todo);
    }

}


export default new DocumentDataService();