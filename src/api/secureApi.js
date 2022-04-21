import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api'
})
axiosInstance.interceptors.request.use(function (config){
    let token = localStorage.getItem('blog_app_token');
    config.headers["Authorization"] = "Bearer " + token;
    return config;

})



export default axiosInstance;