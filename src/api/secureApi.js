import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://aos-blog.herokuapp.com/api'
})
axiosInstance.interceptors.request.use(function (config){
    let token = localStorage.getItem('blog_app_token');
    config.headers["Authorization"] = "Bearer " + token;
    return config;

})



export default axiosInstance;