import axios from 'axios';

import {API_URL} from '../constants/constants.js';

export const  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';


class AuthenticationService{

    executeJwtAuthentificationService(username, password){
        return axios.post(API_URL+'/authenticate' , {
            username,
            password
        });
    }


    registerSuccessfulLoginForJwt( userName , token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, userName);
        this.setupAxiosInterceptors(this.createJwtToken(token));
    }

    createJwtToken(token){
        return 'Bearer ' + token;
    }

    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserloggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user===null){
            return false;
        } else {
            return true;
        }
    }

    getLoggedInUserName(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user===null){
            return '';
        } else {
            return user;
        }
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserloggedIn()) {
                    config.headers.authorization = token;
                }
                return config;
            }
        )
    }
}

export default new AuthenticationService();