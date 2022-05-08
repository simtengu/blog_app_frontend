import axios from 'axios'
// const url = 'http://localhost:5000/api';
const url = 'https://aos-blog.herokuapp.com/api';
const axiosInstance = axios.create({
    baseURL: url
})



export default axiosInstance;