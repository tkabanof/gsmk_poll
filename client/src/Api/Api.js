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
    getAllPollOpen() {
        return instanceAPI.get('poll/open')
    },
    getUniqMO(id) {
        return instanceAPI.get('client/mo/'+ id)
    },
    createNewPoll(description, templateId, state, dataSet) {
        return instanceAPI.post('poll', {description, templateId, state, dataSet})
    },
    deleteOnePoll(id) {
        return instanceAPI.post('poll/del', {id})
    },
    changeStatusPoll(id, state) {
        return instanceAPI.post('poll/setstate', {id, state})
    }
}

export const clientApi = {
    getOneClient(query) {
        return instanceAPI.get('client/getOne',{
            params: query
            })
    },
    getQuestionAnswer(id) {
        return instanceAPI.get('client/question/'+ id)
    },
    setAnswers(data) {
        return instanceAPI.post('client/setAnswer', {data})
    },
    refuseClient(data) {
        return instanceAPI.post('client/close', {data})
    },
    delayClient(data) {
        return instanceAPI.post('client/delay', {data})
    }
}
export const templateApi = {
    getAllTemplate() {
        return instanceAPI.get('template')
    },
    createBrandNewTemplate(data) {
        return instanceAPI.post('template', {data})
    },

    deleteOne(id) {
        return instanceAPI.post('template/del', {id})
    }
}
export const userApi = {
    getAllUsers(paginator) {
        return instanceAPI.get('user/getAll',{
            params: paginator
        })
    },
    createUser(user) {
        return instanceAPI.post('user/createUser', {
            user
        })
    }

}