import axios from 'axios';

import {JPA_API_URL} from '../../constants/constants.js';

class TodoDataService{
    retriveAllTodos(name){
        return axios.get(JPA_API_URL+`/users/${name}/todos`);
    }

    deleteTodo(name, id){
        return axios.delete(JPA_API_URL+`/users/${name}/todos/${id}`);
    }

    retriveTodo(name, id){
        return axios.get(JPA_API_URL+`/users/${name}/todos/${id}`);
    }
    updateTodo(name, id , todo){
        return axios.put(JPA_API_URL+`/users/${name}/todos/${id}`, todo);
    }
    crateTodo(name, todo){
        return axios.post(JPA_API_URL+`/users/${name}/todos`, todo);
    }
}


export default new TodoDataService();