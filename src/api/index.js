import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://aos-blog.herokuapp.com/api'
})



export default axiosInstance;