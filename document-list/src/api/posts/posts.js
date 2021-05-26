import axios from 'axios';

import {
    JPA_API_URL
} from '../../constants/constants.js';

class PostsDataService {

    retriveAllPosts() {
        return axios.get(`${JPA_API_URL}/posts`);
    }

    deletePost(id) {
        return axios.delete(`${JPA_API_URL}/posts/${id}`);
    }

    retrivePost(id) {
        return axios.get(`${JPA_API_URL}/posts/${id}`);
    }

    updatePost(id, post) {
        return axios.put(`${JPA_API_URL}/posts/${id}`, post);
    }

    createPost(post) {
        return axios.post(`${JPA_API_URL}/posts`, post);
    }

}


export default new PostsDataService();