import axios from 'axios';

const instanceAPI = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:7000/api/',
    //headers: {}
});

export const authAPI = {
    login(email: string, password: string) {
        return instanceAPI.post('user/login', {
            email: email,
            password: password
        })
    },
    // logOut() {
    //     return instanceAPI.delete('/auth/login');
    // },
    authMe() {
        return instanceAPI.get(`user/auth`);
    }
}