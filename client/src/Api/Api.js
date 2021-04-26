import axios from 'axios';

export const instanceAPI = axios.create({
    // withCredentials: true,
    baseURL: 'http://localhost:7000/api/',
    //headers: {}
});

// const authInterceptor = config => {
//
//     if (localStorage.getItem('token') !== null) {
//         config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
//     }
// }
// instanceAPI.interceptors.request.use(authInterceptor)

instanceAPI.interceptors.request.use(function (config) {

    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
}, function (error) {
    // Do something with request error
    console.log('Ошибка в axios интерсепторе ')
    console.log(error)
    return Promise.reject(error);
});


export const authAPI = {
    login(email, password) {
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
export const pollApi = {
    getAllPoll() {
        return instanceAPI.get('poll')
    },
    createNewPoll(description, template_id, state) {
        return instanceAPI.post('poll', {
            description: description,
            template_id: template_id,
            state: state
        })
    }
}
export const templateApi = {
    getAllTemplate() {
        return instanceAPI.get('template')
    },
    createNewTemplate(description) {
        return instanceAPI.post('template', {
            description: description
        })
    }
}