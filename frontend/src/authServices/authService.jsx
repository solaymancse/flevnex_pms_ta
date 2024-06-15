import axios from 'axios';


const register = (name, email, password) => {
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}` + 'register', {
        name,
        email,
        password,
        password_confirmation: password
    });
};

const login = (email, password) => {
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}` + 'login', {
        email,
        password
    }).then(response => {
        if (response.data.access_token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}` + 'logout');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export default {
    register,
    login,
    logout,
    getCurrentUser
};
