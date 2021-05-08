import axios from 'axios';

import {
    JPA_API_URL
} from '../../constants/constants.js';

class TodoDataService {
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

    retriveAllFio = async () => {
        const res = await this.retriveAllUsers();
        let users = [];
        res.data.forEach(user => {
            users.push({
                value: user.id,
                label: user.fio_emp
            })
        });
        return users;
    }

    retriveAllVidsName = async () => {
        const res = await this.retriveAllVids();
        let vids = [];
        res.data.forEach(vid => {
            vids.push({
                value: vid.id,
                label: vid.vid_name
            })
        });
        return vids;
    }

    retriveAllTypesName = async () => {
        const res = await this.retriveAllTypes();
        let types = [];
        res.data.forEach(type => {
            types.push({
                value: type.id,
                label: type.typ_name
            })
        });
        return types;
    }

    retriveAllOrganisationsName = async () => {
        const res = await this.retriveAllOrganisations();
        let organisations = [];
        res.data.forEach(organisation => {
            organisations.push({
                value: organisation.id,
                label: organisation.org_name
            })
        });
        return organisations;
    }
}


export default new TodoDataService();