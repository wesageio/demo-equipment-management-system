import axios from 'axios';

const apiUrl = window.env ? window.env.REACT_APP_ADMIN_API : process.env.REACT_APP_ADMIN_API;

export default {
    // called when the user attempts to log in
    login: ({ username, password }) => {
        return new Promise((resolve, reject) => {
            axios(`${apiUrl}/users/signin`, {
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
                    localStorage.setItem('username', res.data.user._id);
                    resolve(res);
                })
                .catch(err => {
                    reject(err.response.data.message);
                });
        });
        // // accept all username/password combinations
        // return Promise.resolve();
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};
