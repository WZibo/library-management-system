import axios from 'axios'
import { Message } from 'element-ui';
let http = axios.create({
    baseURL: '/api'
})
http.interceptors.request.use(config => {
    if (window.localStorage.token) {

        config.headers.Authorization = window.localStorage.token;
    }
    return config
})
http.interceptors.response.use(res => {
    if (res.data.msg == 'Login Success') {
        Message.success('Login Success')
    } 
    return res
})
export default http;