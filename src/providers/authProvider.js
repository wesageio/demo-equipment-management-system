import axios from 'axios';
import jwt_decode from "jwt-decode";

const apiUrl = window.env ? window.env.REACT_APP_ADMIN_API : process.env.REACT_APP_ADMIN_API;

export default {
    // called when the user attempts to log in
    login: ({ username, password }) => {
        return new Promise((resolve, reject) => {
            axios(`${apiUrl}/auth/signin`, {
                method: 'POST',
                data: {
                    username,
                    password
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    localStorage.setItem('token', res.data.accessToken);
                    resolve(res);
                })
                .catch(err => {
                    reject(err.response);
                });
        });
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            const { exp } = jwt_decode(accessToken);
            if (exp < (new Date().getTime() / 1000)){
                localStorage.removeItem('token');
                return Promise.reject();
            }
            return Promise.resolve()
        } else {
            localStorage.removeItem('token');
            return Promise.reject();
        }
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};
