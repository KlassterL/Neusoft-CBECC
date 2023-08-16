import axios from 'axios';
import toast from './toast';

const port = '9000';
const host = 'http://localhost';
const url = host+':'+port;

const service = axios.create({
    baseURL: url,
    timeout: 5000
});

service.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        toast.error('网络请求错误', error.message);
        return Promise.reject(error);
    }
)

export default service;