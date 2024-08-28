import  axios from 'axios';


const AxiosInstance = axios.create({
    baseURL : 'https://jwtauth.techxdeveloper.com/api/',
    headers : {
        "Content-Type": "application/json",
    }
});

AxiosInstance.interceptors.request.use(
    (config) => {
        // Add authorization token to headers if available
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.response.use(
    (response) => {
        // Any status code that lies within the range of 2xx causes this function to trigger
        return response;
    },
    (error) => {
        // Any status codes that fall outside the range of 2xx cause this function to trigger
        if (error.response.status === 401) {
            // Handle unauthorized errors by redirecting to login or showing a message
            // For example, you could redirect the user to the login page
            window.location.href = "/log-in";
        }
        return Promise.reject(error);
    }
);

export default AxiosInstance;