import axios from 'axios'
// const url = 'http://localhost:5000/api';
const url = 'https://blogapp-production-02e6.up.railway.app/api';
const axiosInstance = axios.create({
    baseURL: url
})
axiosInstance.interceptors.request.use(function (config) {
    let token = localStorage.getItem('blog_app_token');
    config.headers["Authorization"] = "Bearer " + token;
    return config;

})



export default axiosInstance;