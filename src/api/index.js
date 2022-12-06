import axios from 'axios'
// const url = 'http://localhost:5000/api';
const url = 'https://blogapp-production-02e6.up.railway.app/api';
const axiosInstance = axios.create({
    baseURL: url
})



export default axiosInstance;