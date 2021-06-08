import axios from 'axios';

import {
    JPA_API_URL
} from '../../constants/constants.js';

class OrganisationsDataService {

    retriveAllOrganisations() {
        return axios.get(`${JPA_API_URL}/orgs`);
    }

    retriveSearchOrganisationByName(searchParametr){
        return axios.get(`${JPA_API_URL}/orgs/search/findByName?name=${searchParametr}`);        
    }

    deleteOrganisation(id) {
        return axios.delete(`${JPA_API_URL}/orgs/${id}`);
    }

    retriveOrganisation(id) {
        return axios.get(`${JPA_API_URL}/orgs/${id}`);
    }

    updateOrganisation(id, organisation) {
        return axios.put(`${JPA_API_URL}/orgs/${id}`, organisation);
    }

    createOrganisation(organisation) {
        return axios.post(`${JPA_API_URL}/orgs`, organisation);
    }

}


export default new OrganisationsDataService();