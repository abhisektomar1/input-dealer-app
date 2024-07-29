import axios from 'axios';
import { BASE_URL_APP } from '../utils';

const axiosInstance = axios.create({
  baseURL: BASE_URL_APP,
});

// Set a default userid for every request
axiosInstance.interceptors.request.use((config) => {
  // Get the token dynamically for each request
  const token = localStorage.getItem("userid");
  
  // Add userid to the request data
  config.data = {
    ...config.data,
    userid: token,
  };
  
  return config;
});

export default axiosInstance;