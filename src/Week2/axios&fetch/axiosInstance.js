import axios from "axios";
import { BASE_URL } from "../../TanQuery/Api";



const axiosInstance = axios.create({
    baseURL:`${BASE_URL}/`,
    timeout:1000,
    headers: { 'Content-Type': 'application/json' }

})

export default axiosInstance