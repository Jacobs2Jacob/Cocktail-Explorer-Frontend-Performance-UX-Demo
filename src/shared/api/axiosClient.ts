import axios from 'axios';

// Create a single Axios instance for all API calls
export const axiosClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    withCredentials: true,
});

export default axiosClient;