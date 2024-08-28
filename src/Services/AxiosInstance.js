import  axios from 'axios';
const AxiosInstance = axios.create({
    baseURL : 'https://jwtauth.techxdeveloper.com/api/',
    headers : {
        "Content-Type": "application/json",
    }
});
AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;

    },
    (error) => {
        return Promise.reject(error);
    }
);
AxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            window.location.href = '/log-in';
        }
        return Promise.reject(error);
    }
)
export default AxiosInstance;